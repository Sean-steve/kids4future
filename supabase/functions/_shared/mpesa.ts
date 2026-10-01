export type MpesaConfig = {
  authUrl: string;
  stkPushUrl: string;
  stkQueryUrl: string;
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  callbackUrl: string;
  transactionType: string;
};

export function getMpesaConfig(): MpesaConfig {
  const config: MpesaConfig = {
    authUrl: Deno.env.get("MPESA_AUTH_URL") ?? "",
    stkPushUrl: Deno.env.get("MPESA_STK_PUSH_URL") ?? "",
    stkQueryUrl: Deno.env.get("MPESA_STK_QUERY_URL") ?? "",
    consumerKey: Deno.env.get("MPESA_CONSUMER_KEY") ?? "",
    consumerSecret: Deno.env.get("MPESA_CONSUMER_SECRET") ?? "",
    shortcode: Deno.env.get("MPESA_SHORTCODE") ?? "",
    passkey: Deno.env.get("MPESA_PASSKEY") ?? "",
    callbackUrl: Deno.env.get("MPESA_CALLBACK_URL") ?? "",
    transactionType: Deno.env.get("MPESA_TRANSACTION_TYPE") ?? "CustomerPayBillOnline",
  };

  const missing = Object.entries(config)
    .filter(([key, value]) => key !== "transactionType" && !value)
    .map(([key]) => key);
  if (missing.length) throw new Error(`Missing M-Pesa configuration: ${missing.join(", ")}`);
  return config;
}

function eatTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (name: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === name)?.value ?? "";
  return `${part("year")}${part("month")}${part("day")}${part("hour")}${part("minute")}${part("second")}`;
}

function toBase64(value: string) {
  return btoa(value);
}

export function normalizeKenyanPhone(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  const normalized = digits.startsWith("254") ? digits : digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  if (!/^254[17]\d{8}$/.test(normalized)) throw new Error("Invalid Kenyan mobile number");
  return normalized;
}

export async function getMpesaAccessToken(config: MpesaConfig) {
  const credentials = toBase64(`${config.consumerKey}:${config.consumerSecret}`);
  const response = await fetch(config.authUrl, {
    method: "GET",
    headers: { Authorization: `Basic ${credentials}`, Accept: "application/json" },
  });
  const body = await response.json().catch(() => ({})) as Record<string, unknown>;
  if (!response.ok || typeof body.access_token !== "string") {
    throw new Error(`M-Pesa authorization failed (${response.status})`);
  }
  return body.access_token;
}

export async function initiateStkPush(args: {
  amount: number;
  phone: string;
  accountReference: string;
  description: string;
}) {
  const config = getMpesaConfig();
  const token = await getMpesaAccessToken(config);
  const timestamp = eatTimestamp();
  const password = toBase64(`${config.shortcode}${config.passkey}${timestamp}`);
  const phone = normalizeKenyanPhone(args.phone);

  const requestBody = {
    BusinessShortCode: config.shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: config.transactionType,
    Amount: args.amount,
    PartyA: phone,
    PartyB: config.shortcode,
    PhoneNumber: phone,
    CallBackURL: config.callbackUrl,
    AccountReference: args.accountReference.slice(0, 12),
    TransactionDesc: args.description.slice(0, 20),
  };

  const response = await fetch(config.stkPushUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const body = await response.json().catch(() => ({})) as Record<string, unknown>;
  return { ok: response.ok, status: response.status, body };
}

export async function queryStkPush(checkoutRequestId: string) {
  const config = getMpesaConfig();
  const token = await getMpesaAccessToken(config);
  const timestamp = eatTimestamp();
  const password = toBase64(`${config.shortcode}${config.passkey}${timestamp}`);

  const response = await fetch(config.stkQueryUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: config.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
  });
  const body = await response.json().catch(() => ({})) as Record<string, unknown>;
  return { ok: response.ok, status: response.status, body };
}
