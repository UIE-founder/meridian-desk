"use client";
import { useState } from "react";

export function MandateForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/mandates", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    setPending(false);
    if (!res.ok) { setError("Mandate could not be accepted."); return; }
    window.location.href = "/desk/matches";
  }
  const field = "mt-2 w-full border border-ink-100/15 bg-ink-900 px-4 py-3 text-ink-50 outline-none";
  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
      <label className="text-sm text-ink-100/70">Asset class
        <select name="class" className={field} defaultValue="yacht">
          <option value="yacht">Superyacht</option>
          <option value="jet">Private jet</option>
          <option value="estate">Luxury estate</option>
        </select>
      </label>
      <label className="text-sm text-ink-100/70">Side
        <select name="side" className={field} defaultValue="acquire">
          <option value="acquire">Acquire</option>
          <option value="dispose">Dispose</option>
          <option value="charter">Charter</option>
          <option value="lease">Lease</option>
        </select>
      </label>
      <label className="text-sm text-ink-100/70">Ceiling<input name="budgetMax" type="number" placeholder="35000000" className={field} /></label>
      <label className="text-sm text-ink-100/70">Currency
        <select name="currency" className={field} defaultValue="EUR"><option>EUR</option><option>USD</option><option>GBP</option><option>CHF</option></select>
      </label>
      <label className="text-sm text-ink-100/70">Regions<input name="regions" placeholder="West Med, Antibes" className={field} /></label>
      <label className="text-sm text-ink-100/70">Timeline (days)<input name="timelineDays" type="number" defaultValue={90} className={field} /></label>
      <label className="text-sm text-ink-100/70">Must include<input name="must" placeholder="helipad, off-market" className={field} /></label>
      <label className="text-sm text-ink-100/70">Must not<input name="mustNot" placeholder="public listing" className={field} /></label>
      <label className="text-sm text-ink-100/70 md:col-span-2">Narrative
        <textarea name="narrative" required minLength={12} rows={5} className={field} defaultValue="Quiet search for a 50 metre West Med motor yacht, off-market, family use." />
      </label>
      <label className="text-sm text-ink-100/70">Privacy
        <select name="privacy" className={field} defaultValue="strict"><option value="strict">Strict</option><option value="standard">Standard</option></select>
      </label>
      <div className="flex items-end">
        <button disabled={pending} className="rounded-full bg-brass-500 px-6 py-3 text-ink-950">{pending ? "Running desk…" : "Run the desk"}</button>
      </div>
      {error ? <p className="text-sm text-red-300 md:col-span-2">{error}</p> : null}
    </form>
  );
}
