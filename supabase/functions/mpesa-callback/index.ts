import { createAdminClient, sha256 } from "../_shared/server.ts";
import { normalizeKenyanPhone } from "../_shared/mpesa.ts";

type Json = Record<string, unknown>;

type MetadataItem = { Name?: unknown; Value?: unknown };

function callbackMetadata(stk: Json) {
  const metadata = stk.CallbackMetadata as Json | undefined;
  const items = Array.isArray(metadata?.Item) ? metadata?.Item as MetadataItem[] : [];
  const map = new Map<string, unknown>();
  for (const item of items) {
    if (typeof item?.Name === "string") map.set(item.Name, item.Value);
  }
  return map;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const expectedToken = Deno.env.get("MPESA_CALLBACK_TOKEN") ?? "";
  const suppliedToken = new URL(req.url).searchParams.get("token") ?? "";
  if (!expectedToken || suppliedToken !== expectedToken) {
    console.error("Rejected M-Pesa callback with invalid callback token");
    return new Response("Unauthorized", { status: 401 });
  }

  const raw = await req.text();
  let payload: Json;
  try {
    payload = JSON.parse(raw) as Json;
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const body = payload.Body as Json | undefined;
  const stk = body?.stkCallback as Json | undefined;
  const checkoutRequestId = typeof stk?.CheckoutRequestID === "string" ? stk.CheckoutRequestID : "";
  const merchantRequestId = typeof stk?.MerchantRequestID === "string" ? stk.MerchantRequestID : "";
  const resultCode = Number(stk?.ResultCode);
  const resultDesc = typeof stk?.ResultDesc === "string" ? stk.ResultDesc : "";

  if (!checkoutRequestId || !Number.isFinite(resultCode)) {
    return new Response("Bad Request", { status: 400 });
  }

  const admin = createAdminClient();
  const metadata = callbackMetadata(stk ?? {});
  const receiptNumber = typeof metadata.get("MpesaReceiptNumber") === "string" ? String(metadata.get("MpesaReceiptNumber")) : "";
  const eventKey = `stk-callback:${checkoutRequestId}:${resultCode}:${receiptNumber || "none"}`;
  const checksum = await sha256(raw);

  const { data: donation } = await admin
    .from("donations")
    .select("id,status,amount,currency,donor_phone,public_reference,provider_reference")
    .eq("provider", "mpesa")
    .eq("checkout_reference", checkoutRequestId)
    .maybeSingle();

  const { data: existing } = await admin
    .from("payment_events")
    .select("id,processing_status")
    .eq("provider", "mpesa")
    .eq("provider_event_key", eventKey)
    .maybeSingle();

  if (existing?.processing_status === "processed") {
    return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const { data: eventRow, error: eventError } = await admin.from("payment_events").upsert({
    provider: "mpesa",
    provider_event_key: eventKey,
    event_type: "stk_callback",
    verified: false,
    payload_checksum: checksum,
    payload,
    processing_status: donation ? "correlated" : "orphaned",
    donation_id: donation?.id ?? null,
  }, { onConflict: "provider,provider_event_key" }).select("id").single();

  if (eventError || !eventRow) {
    console.error("Could not persist M-Pesa callback", eventError?.message);
    return new Response("Service Unavailable", { status: 503 });
  }

  if (!donation) {
    console.error("Orphaned M-Pesa callback", checkoutRequestId, merchantRequestId);
    return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  if (resultCode !== 0) {
    if (["created", "pending"].includes(donation.status)) {
      await admin.from("donations").update({ status: "failed", updated_at: new Date().toISOString() }).eq("id", donation.id);
    }
    await admin.from("payment_events").update({
      verified: true,
      processing_status: "processed",
      processed_at: new Date().toISOString(),
      payload: { ...payload, _normalized: { resultCode, resultDesc, merchantRequestId } },
    }).eq("id", eventRow.id);
    return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const amount = Number(metadata.get("Amount"));
  const callbackPhoneRaw = String(metadata.get("PhoneNumber") ?? "");
  let callbackPhone = "";
  try { callbackPhone = normalizeKenyanPhone(callbackPhoneRaw); } catch { /* handled below */ }

  const amountMatches = Number.isFinite(amount) && Number(donation.amount) === amount;
  const phoneMatches = Boolean(callbackPhone && donation.donor_phone && callbackPhone === donation.donor_phone);
  const receiptPresent = Boolean(receiptNumber);

  if (!amountMatches || !phoneMatches || !receiptPresent) {
    await admin.from("donations").update({ status: "requires_review", updated_at: new Date().toISOString() }).eq("id", donation.id);
    await admin.from("payment_events").update({
      verified: false,
      processing_status: "requires_review",
      processed_at: new Date().toISOString(),
      payload: { ...payload, _normalized: { resultCode, resultDesc, merchantRequestId, amountMatches, phoneMatches, receiptPresent } },
    }).eq("id", eventRow.id);
    return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const { error: paidError } = await admin.from("donations").update({
    provider_reference: receiptNumber,
    status: "paid",
    paid_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("id", donation.id).in("status", ["created", "pending", "requires_review"]);

  if (paidError) {
    console.error("Could not mark donation paid", paidError.message);
    await admin.from("payment_events").update({ processing_status: "requires_review", processed_at: new Date().toISOString() }).eq("id", eventRow.id);
    return new Response("Service Unavailable", { status: 503 });
  }

  const { error: receiptError } = await admin.rpc("issue_receipt_for_donation", { target_donation_id: donation.id });
  if (receiptError) console.error("Receipt issuance requires review", receiptError.message);

  await admin.from("payment_events").update({
    verified: true,
    processing_status: receiptError ? "receipt_pending_review" : "processed",
    processed_at: new Date().toISOString(),
    payload: { ...payload, _normalized: { resultCode, resultDesc, merchantRequestId, amount, receiptNumber } },
  }).eq("id", eventRow.id);

  return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
});
