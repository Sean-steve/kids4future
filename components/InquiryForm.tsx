"use client";

import { FormEvent, useState } from "react";

type InquiryKind = "contact" | "volunteer" | "partner";

export function InquiryForm({ kind }: { kind: InquiryKind }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error" | "unavailable">("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) { setState("unavailable"); return; }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;
    setState("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data, source: "futurerise-web" }),
      });
      if (!response.ok) throw new Error("submission failed");
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return <form className="form-grid" onSubmit={submit} noValidate>
    <div className="field"><label htmlFor={`${kind}-name`}>Name</label><input id={`${kind}-name`} name="name" autoComplete="name" required maxLength={120}/></div>
    <div className="field"><label htmlFor={`${kind}-email`}>Email</label><input id={`${kind}-email`} name="email" type="email" autoComplete="email" required maxLength={200}/></div>
    <div className="field"><label htmlFor={`${kind}-phone`}>Phone <span className="form-help">(optional)</span></label><input id={`${kind}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40}/></div>
    <div className="field"><label htmlFor={`${kind}-org`}>Organization <span className="form-help">(optional)</span></label><input id={`${kind}-org`} name="organization" maxLength={160}/></div>
    {kind === "volunteer" ? <div className="field full"><label htmlFor="volunteer-area">Area of interest</label><select id="volunteer-area" name="interest" required defaultValue=""><option value="" disabled>Select one</option><option>Mentorship support</option><option>Skills & career</option><option>Professional services</option><option>Events & logistics</option></select></div> : null}
    {kind === "partner" ? <div className="field full"><label htmlFor="partner-area">Partnership area</label><select id="partner-area" name="interest" required defaultValue=""><option value="" disabled>Select one</option><option>Employment & apprenticeships</option><option>Education & training</option><option>Professional/referral services</option><option>Funding & sponsorship</option><option>Community partnership</option></select></div> : null}
    <div className="field full"><label htmlFor={`${kind}-message`}>Message</label><textarea id={`${kind}-message`} name="message" required maxLength={3000} placeholder={kind === "contact" ? "How can FutureRise help?" : "Tell us what you would like to contribute."}/></div>
    <div className="field honeypot" aria-hidden="true"><label htmlFor={`${kind}-website`}>Website</label><input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="field full"><label className="consent-row"><input name="consent" type="checkbox" value="yes" required/> <span>I consent to FutureRise using these details to respond to this enquiry. I will not submit sensitive child case information through this form.</span></label></div>
    <div className="field full"><button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send"}</button></div>
    {state === "success" ? <div className="alert field full" role="status">Thank you. Your message was received.</div> : null}
    {state === "error" ? <div className="danger-note field full" role="alert">We could not submit the form. Please use the email contact while we restore the service.</div> : null}
    {state === "unavailable" ? <div className="data-note field full" role="status">The secure form backend is not connected yet. Please use the published email contact for now.</div> : null}
  </form>;
}
