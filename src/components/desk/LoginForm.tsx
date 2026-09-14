"use client";
import { useState } from "react";
export function LoginForm() {
  const [code, setCode] = useState("MERIDIAN-FOUNDERS");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await fetch("/api/auth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    setPending(false);
    if (!res.ok) { setError("Invitation not recognised."); return; }
    window.location.href = "/desk/mandate";
  }
  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-4">
      <label className="block text-sm text-ink-100/70">Invitation
        <input value={code} onChange={(e) => setCode(e.target.value)} className="mt-2 w-full border border-ink-100/15 bg-ink-900 px-4 py-3 text-ink-50 outline-none" />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button disabled={pending} className="rounded-full bg-brass-500 px-6 py-3 text-ink-950">{pending ? "Checking…" : "Continue"}</button>
      <p className="text-xs text-ink-400">Demo invitation: MERIDIAN-FOUNDERS. Officers: OFFICER-DEMO.</p>
    </form>
  );
}
