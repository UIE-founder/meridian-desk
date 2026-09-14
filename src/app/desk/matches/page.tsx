import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DeskShell } from "@/components/desk/DeskShell";
import { readSession } from "@/lib/auth/desk-auth";
import type { DeskRun } from "@/lib/agents/orchestrator";

export const metadata = { title: "Matches", robots: { index: false, follow: false } };

export default async function MatchesPage() {
  const session = await readSession();
  if (!session) redirect("/desk");
  const raw = (await cookies()).get("meridian_run")?.value;
  if (!raw) redirect("/desk/mandate");
  const run = JSON.parse(raw) as DeskRun;
  return (
    <DeskShell title="Closed shortlist" eyebrow={`Mandate ${run.mandate.id}`}>
      <p className="max-w-2xl text-ink-100/75">{run.humanOwner}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {run.matches.map((row) => (
          <article key={row.score.assetId} className="border border-ink-100/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-brass-400">{row.visibility.replace("_", " ")} · {row.score.total}</p>
            <h2 className="mt-3 font-serif text-2xl">{row.name}</h2>
            <ul className="mt-4 space-y-1 text-sm text-ink-100/70">
              {row.score.rationale.slice(0, 3).map((line) => <li key={line}>{line}</li>)}
            </ul>
            {row.score.risks[0] ? <p className="mt-4 text-sm text-brass-300">{row.score.risks[0]}</p> : null}
          </article>
        ))}
      </div>
      <section className="mt-14">
        <h2 className="font-serif text-3xl">Diligence packs</h2>
        <div className="mt-6 space-y-8">
          {run.packs.map((pack) => (
            <article key={pack.assetId} className="border-t border-ink-100/10 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-brass-400">{pack.assetId}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-100/75">
                {pack.nextHumanActions.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="font-serif text-3xl">Agent log</h2>
        <ol className="mt-4 space-y-2 text-sm text-ink-100/70">
          {run.events.map((event, i) => (
            <li key={i}><span className="text-brass-300">{event.agent}</span> — {event.message}</li>
          ))}
        </ol>
      </section>
    </DeskShell>
  );
}
