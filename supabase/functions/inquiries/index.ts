import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const rateLimitSalt = Deno.env.get("RATE_LIMIT_SALT") ?? "futurerise-dev-salt";
const allowedOrigins = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") ?? "https://sean-steve.github.io,http://localhost:3000")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const kinds = new Set(["contact", "volunteer", "partner"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin) ? origin : "https://sean-steve.github.io";
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(status: number, body: unknown, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(origin) },
  });
}

function clean(value: unknown, max: number, required = false) {
  if (typeof value !== "string") return required ? null : "";
  const trimmed = value.trim();
  if ((required && !trimmed) || trimmed.length > max) return null;
  return trimmed;
}

async function hashFingerprint(value: string) {
  const bytes = new TextEncoder().encode(`${rateLimitSalt}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    if (origin && !allowedOrigins.has(origin)) return json(403, { ok: false }, origin);
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" }, origin);
  if (origin && !allowedOrigins.has(origin)) return json(403, { ok: false, error: "origin_not_allowed" }, origin);

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > 20_000) return json(413, { ok: false, error: "payload_too_large" }, origin);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { ok: false, error: "invalid_json" }, origin);
  }

  // Honeypot: answer generically so automated submitters do not learn the rule.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json(202, { ok: true }, origin);
  }

  const kind = clean(payload.kind, 20, true);
  const name = clean(payload.name, 120, true);
  const email = clean(payload.email, 200, true)?.toLowerCase() ?? null;
  const phone = clean(payload.phone, 40);
  const organization = clean(payload.organization, 160);
  const interest = clean(payload.interest, 200);
  const message = clean(payload.message, 3000, true);
  const source = clean(payload.source, 80) || "futurerise-web";
  const consent = payload.consent === "yes";

  if (!kind || !kinds.has(kind) || !name || !email || !emailPattern.test(email) || !message || !consent) {
    return json(400, { ok: false, error: "invalid_submission" }, origin);
  }

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase function configuration");
    return json(503, { ok: false, error: "service_unavailable" }, origin);
  }

  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const fingerprintSource = forwarded || `${req.headers.get("user-agent") ?? "unknown"}:${email}`;
  const fingerprintHash = await hashFingerprint(fingerprintSource);
  const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { count, error: countError } = await admin
    .from("form_submission_windows")
    .select("id", { count: "exact", head: true })
    .eq("fingerprint_hash", fingerprintHash)
    .eq("kind", kind)
    .gte("created_at", windowStart);

  if (countError) {
    console.error("Rate-limit lookup failed", countError.message);
    return json(503, { ok: false, error: "service_unavailable" }, origin);
  }

  if ((count ?? 0) >= 5) return json(429, { ok: false, error: "too_many_requests" }, origin);

  const { error: rateError } = await admin.from("form_submission_windows").insert({
    fingerprint_hash: fingerprintHash,
    kind,
  });
  if (rateError) {
    console.error("Rate-limit write failed", rateError.message);
    return json(503, { ok: false, error: "service_unavailable" }, origin);
  }

  const { error } = await admin.from("inquiries").insert({
    kind,
    name,
    email,
    phone: phone || null,
    organization: organization || null,
    interest: interest || null,
    message,
    source,
    privacy_version: "2026-10-01",
    consent_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Inquiry insert failed", error.message);
    return json(503, { ok: false, error: "service_unavailable" }, origin);
  }

  return json(202, { ok: true }, origin);
});
