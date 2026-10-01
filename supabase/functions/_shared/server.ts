import { createClient } from "npm:@supabase/supabase-js@2";

export function readServerSecretKey() {
  const current = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (current) {
    try {
      const keys = JSON.parse(current) as Record<string, string>;
      const key = keys.default ?? Object.values(keys)[0];
      if (key) return key;
    } catch {
      console.error("Could not parse SUPABASE_SECRET_KEYS");
    }
  }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

export function createAdminClient() {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = readServerSecretKey();
  if (!url || !key) throw new Error("Missing Supabase server configuration");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function allowedOrigins() {
  return new Set(
    (Deno.env.get("ALLOWED_ORIGINS") ?? "https://sean-steve.github.io,http://localhost:3000")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

export function corsHeaders(origin: string | null) {
  const allowed = allowedOrigins();
  const safeOrigin = origin && allowed.has(origin) ? origin : "https://sean-steve.github.io";
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function json(status: number, body: unknown, origin: string | null = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(origin) },
  });
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function cleanString(value: unknown, max: number, required = false) {
  if (typeof value !== "string") return required ? null : "";
  const trimmed = value.trim();
  if ((required && !trimmed) || trimmed.length > max) return null;
  return trimmed;
}
