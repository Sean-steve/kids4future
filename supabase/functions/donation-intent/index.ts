import { allowedOrigins, cleanString, createAdminClient, corsHeaders, json, sha256 } from "../_shared/server.ts";
import { initiateStkPush, normalizeKenyanPhone } from "../_shared/mpesa.ts";

const programKeys = new Set(["kids4future", "rise-boys", "family-forward", "future-skills", "general"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const origins = allowedOrigins();

  if (req.method === "OPTIONS") {
    if (origin && !origins.has(origin)) return json(403, { ok: false }, origin);
    return new Response("ok", { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" }, origin);
  if (origin && !origins.has(origin)) return json(403, { ok: false, error: "origin_not_allowed" }, origin);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { ok: false, error: "invalid_json" }, origin);
  }

  const rawAmount = Number(payload.amount);
  if (!Number.isInteger(rawAmount) || rawAmount < 1 || rawAmount > 10_000_000) {
    return json(400, { ok: false, error: "invalid_amount" }, origin);
  }

  const rawPhone = cleanString(payload.phone, 40, true);
  const donorName = cleanString(payload.donorName, 120);
  const donorEmail = cleanString(payload.donorEmail, 200)?.toLowerCase() ?? "";
  const programKey = cleanString(payload.programKey, 40) || "general";
  const campaignId = cleanString(payload.campaignId, 80);

  if (!rawPhone || !programKeys.has(programKey)) return json(400, { ok: false, error: "invalid_submission" }, origin);
  if (donorEmail && !emailPattern.test(donorEmail)) return json(400, { ok: false, error: "invalid_email" }, origin);

  let phone: string;
  try {
    phone = normalizeKenyanPhone(rawPhone);
  } catch {
    return json(400, { ok: false, error: "invalid_phone" }, origin);
  }

  const admin = createAdminClient();
  const rateSalt = Deno.env.get("RATE_LIMIT_SALT") ?? "futurerise-dev-salt";
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const fingerprint = await sha256(`${rateSalt}:${forwarded ?? "unknown"}:${phone}`);
  const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { count, error: rateReadError } = await admin
    .from("api_rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("endpoint", "donation-intent")
    .eq("fingerprint_hash", fingerprint)
    .gte("created_at", windowStart);

  if (rateReadError) return json(503, { ok: false, error: "service_unavailable" }, origin);
  if ((count ?? 0) >= 3) return json(429, { ok: false, error: "too_many_requests" }, origin);

  await admin.from("api_rate_limits").insert({ endpoint: "donation-intent", fingerprint_hash: fingerprint });

  if (campaignId) {
    const { data: campaign } = await admin
      .from("cms_campaigns")
      .select("id,status")
      .eq("id", campaignId)
      .eq("status", "published")
      .maybeSingle();
    if (!campaign) return json(400, { ok: false, error: "invalid_campaign" }, origin);
  }

  const { data: donation, error: donationError } = await admin
    .from("donations")
    .insert({
      provider: "mpesa",
      donor_name: donorName || null,
      donor_email: donorEmail || null,
      donor_phone: phone,
      amount: rawAmount,
      currency: "KES",
      campaign_id: campaignId || null,
      program_key: programKey,
      status: "created",
    })
    .select("id,public_reference")
    .single();

  if (donationError || !donation) {
    console.error("Donation intent insert failed", donationError?.message);
    return json(503, { ok: false, error: "service_unavailable" }, origin);
  }

  try {
    const result = await initiateStkPush({
      amount: rawAmount,
      phone,
      accountReference: donation.public_reference.replace(/-/g, "").slice(-12),
      description: "FutureRise donation",
    });

    const checkoutReference = typeof result.body.CheckoutRequestID === "string" ? result.body.CheckoutRequestID : null;
    const responseCode = String(result.body.ResponseCode ?? "");
    const accepted = result.ok && responseCode === "0" && checkoutReference;
    const eventKey = checkoutReference ? `stk-init:${checkoutReference}` : `stk-init-failed:${donation.id}`;

    await admin.from("payment_events").upsert({
      provider: "mpesa",
      provider_event_key: eventKey,
      event_type: "stk_initiation",
      verified: true,
      payload_checksum: await sha256(JSON.stringify(result.body)),
      payload: result.body,
      processing_status: accepted ? "accepted" : "rejected",
      donation_id: donation.id,
      processed_at: new Date().toISOString(),
    }, { onConflict: "provider,provider_event_key", ignoreDuplicates: true });

    await admin.from("donations").update({
      checkout_reference: checkoutReference,
      status: accepted ? "pending" : "failed",
      updated_at: new Date().toISOString(),
    }).eq("id", donation.id);

    if (!accepted) {
      return json(502, { ok: false, error: "payment_request_rejected", reference: donation.public_reference }, origin);
    }

    return json(202, {
      ok: true,
      reference: donation.public_reference,
      checkoutReference,
      message: typeof result.body.CustomerMessage === "string" ? result.body.CustomerMessage : "Check your phone to complete the M-Pesa payment.",
    }, origin);
  } catch (error) {
    console.error("M-Pesa initiation error", error);
    await admin.from("donations").update({ status: "failed", updated_at: new Date().toISOString() }).eq("id", donation.id);
    return json(503, { ok: false, error: "payment_service_unavailable", reference: donation.public_reference }, origin);
  }
});
