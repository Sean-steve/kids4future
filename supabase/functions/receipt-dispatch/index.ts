import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import { createAdminClient, json } from "../_shared/server.ts";

const allowedRoles = new Set(["admin", "finance_reviewer"]);

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)));
  }
  return btoa(binary);
}

async function buildReceiptPdf(receipt: {
  receipt_number: string;
  issued_at: string;
  recipient_name: string | null;
  amount: number;
  currency: string;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.14, 0.19, 0.29);
  const muted = rgb(0.38, 0.43, 0.52);
  const accent = rgb(0.49, 0.36, 1);

  page.drawRectangle({ x: 0, y: 770, width: 595.28, height: 71.89, color: accent });
  page.drawText("FutureRise Foundation", { x: 48, y: 798, size: 24, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Donation acknowledgement", { x: 48, y: 745, size: 18, font: bold, color: ink });
  page.drawText(`Receipt: ${receipt.receipt_number}`, { x: 48, y: 712, size: 12, font: regular, color: muted });
  page.drawText(`Issued: ${new Date(receipt.issued_at).toLocaleDateString("en-KE")}`, { x: 48, y: 690, size: 12, font: regular, color: muted });

  page.drawText("Received from", { x: 48, y: 635, size: 11, font: regular, color: muted });
  page.drawText(receipt.recipient_name || "Anonymous supporter", { x: 48, y: 610, size: 18, font: bold, color: ink });
  page.drawText("Amount", { x: 48, y: 555, size: 11, font: regular, color: muted });
  page.drawText(`${receipt.currency} ${Number(receipt.amount).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`, { x: 48, y: 522, size: 26, font: bold, color: ink });

  page.drawText("Thank you for supporting FutureRise Foundation's work with children, young people and families.", { x: 48, y: 455, size: 11, font: regular, color: ink, maxWidth: 490, lineHeight: 16 });
  page.drawText("This document acknowledges the recorded donation. It does not by itself represent or guarantee any tax-deductibility status. Applicable legal and tax treatment depends on FutureRise's formal registration/status and the donor's circumstances.", { x: 48, y: 405, size: 9.5, font: regular, color: muted, maxWidth: 490, lineHeight: 14 });
  page.drawText("Protect · Nurture · Equip · Rise", { x: 48, y: 78, size: 10, font: bold, color: accent });

  return await pdf.save();
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  const authorization = req.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return json(401, { ok: false, error: "unauthorized" });

  const admin = createAdminClient();
  const { data: userResult, error: userError } = await admin.auth.getUser(token);
  const user = userResult.user;
  if (userError || !user) return json(401, { ok: false, error: "unauthorized" });

  const { data: profile } = await admin.from("admin_profiles").select("role,is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active || !allowedRoles.has(profile.role)) return json(403, { ok: false, error: "forbidden" });

  const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const fromEmail = Deno.env.get("RECEIPT_FROM_EMAIL") ?? "";
  if (!resendKey || !fromEmail) return json(503, { ok: false, error: "email_not_configured" });

  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { /* optional */ }
  const receiptId = typeof payload.receiptId === "string" ? payload.receiptId : "";

  let query = admin
    .from("receipts")
    .select("id,receipt_number,donation_id,recipient_name,recipient_email,amount,currency,issued_at,delivery_status")
    .in("delivery_status", ["pending", "failed"])
    .order("issued_at", { ascending: true })
    .limit(20);
  if (receiptId) query = query.eq("id", receiptId);

  const { data: receipts, error: receiptReadError } = await query;
  if (receiptReadError) return json(503, { ok: false, error: "service_unavailable" });

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const receipt of receipts ?? []) {
    if (!receipt.recipient_email) {
      await admin.from("receipts").update({ delivery_status: "not_requested" }).eq("id", receipt.id);
      skipped += 1;
      continue;
    }

    try {
      const pdfBytes = await buildReceiptPdf(receipt);
      const objectPath = `${new Date(receipt.issued_at).getUTCFullYear()}/${receipt.receipt_number}.pdf`;
      const { error: uploadError } = await admin.storage.from("receipts").upload(objectPath, pdfBytes, {
        contentType: "application/pdf",
        cacheControl: "3600",
        upsert: true,
      });
      if (uploadError) throw new Error(`Receipt storage failed: ${uploadError.message}`);

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `futurerise-receipt/${receipt.id}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [receipt.recipient_email],
          subject: `FutureRise donation receipt ${receipt.receipt_number}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h1>Thank you for helping a future rise.</h1><p>We have recorded your donation of <strong>${receipt.currency} ${Number(receipt.amount).toLocaleString("en-KE", { minimumFractionDigits: 2 })}</strong>.</p><p>Your acknowledgement number is <strong>${receipt.receipt_number}</strong>.</p><p>A PDF copy is attached for your records.</p><p style="color:#667085;font-size:12px">This acknowledgement does not by itself guarantee tax-deductibility. Applicable treatment depends on FutureRise Foundation's formal legal/tax status and your circumstances.</p></div>`,
          attachments: [{ filename: `${receipt.receipt_number}.pdf`, content: bytesToBase64(pdfBytes) }],
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Email provider rejected receipt (${response.status}): ${detail.slice(0, 200)}`);
      }

      await admin.from("receipts").update({ delivery_status: "sent", document_url: objectPath }).eq("id", receipt.id);
      sent += 1;
    } catch (error) {
      console.error("Receipt delivery failed", receipt.id, error);
      await admin.from("receipts").update({ delivery_status: "failed" }).eq("id", receipt.id);
      failed += 1;
    }
  }

  await admin.from("audit_events").insert({
    actor_id: user.id,
    action: "receipts.dispatch",
    resource_type: "receipt_batch",
    summary: { requested: (receipts ?? []).length, sent, failed, skipped },
  });

  return json(200, { ok: true, processed: (receipts ?? []).length, sent, failed, skipped });
});
