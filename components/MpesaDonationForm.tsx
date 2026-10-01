"use client";

import { FormEvent, useState } from "react";

const presets = [500, 1000, 2500, 5000];

export function MpesaDonationForm() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const endpoint = process.env.NEXT_PUBLIC_DONATION_ENDPOINT || (supabaseUrl ? `${supabaseUrl}/functions/v1/donation-intent` : undefined);
  const [amount, setAmount] = useState(1000);
  const [state, setState] = useState<"idle" | "sending" | "prompted" | "error" | "unavailable">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) {
      setState("unavailable");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          phone: data.get("phone"),
          donorName: data.get("donorName"),
          donorEmail: data.get("donorEmail"),
          programKey: data.get("programKey") || "general",
        }),
      });
      const body = await response.json().catch(() => ({})) as { ok?: boolean; message?: string; reference?: string; error?: string };
      if (!response.ok || !body.ok) throw new Error(body.error || "payment_request_failed");
      setReference(body.reference || "");
      setMessage(body.message || "Check your phone to complete the M-Pesa payment.");
      setState("prompted");
    } catch {
      setState("error");
    }
  }

  return <form className="donation-form" onSubmit={submit}>
    <div className="field full"><label>Choose an amount</label><div className="amount-presets">{presets.map((value) => <button className={amount === value ? "amount-chip active" : "amount-chip"} type="button" key={value} onClick={() => setAmount(value)}>KES {value.toLocaleString("en-KE")}</button>)}</div></div>
    <div className="field"><label htmlFor="donation-amount">Amount (KES)</label><input id="donation-amount" type="number" min="1" step="1" required value={amount} onChange={(event) => setAmount(Number(event.target.value))}/></div>
    <div className="field"><label htmlFor="donation-phone">M-Pesa phone</label><input id="donation-phone" name="phone" type="tel" placeholder="07xx xxx xxx" required autoComplete="tel"/></div>
    <div className="field"><label htmlFor="donor-name">Name <span className="form-help">(optional)</span></label><input id="donor-name" name="donorName" maxLength={120} autoComplete="name"/></div>
    <div className="field"><label htmlFor="donor-email">Email for receipt <span className="form-help">(optional)</span></label><input id="donor-email" name="donorEmail" type="email" maxLength={200} autoComplete="email"/></div>
    <div className="field full"><label htmlFor="donation-program">Direct my gift</label><select id="donation-program" name="programKey" defaultValue="general"><option value="general">Where it is most useful</option><option value="kids4future">Kids4Future</option><option value="rise-boys">Rise Boys</option><option value="family-forward">Family Forward</option><option value="future-skills">Future Skills</option></select></div>
    <div className="field full"><button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending M-Pesa prompt…" : "Donate with M-Pesa"}</button></div>
    {state === "prompted" ? <div className="alert field full" role="status"><strong>{message}</strong>{reference ? <><br/>FutureRise reference: <strong>{reference}</strong></> : null}<br/><span className="form-help">A receipt is issued only after the server receives and reconciles the payment result.</span></div> : null}
    {state === "error" ? <div className="danger-note field full" role="alert">We could not start the M-Pesa payment. No successful donation is being claimed. Please try again later or use the PayPal option.</div> : null}
    {state === "unavailable" ? <div className="data-note field full" role="status">M-Pesa is not connected on this deployment yet. The payment form will activate after the dedicated FutureRise backend and Daraja credentials are configured.</div> : null}
  </form>;
}
