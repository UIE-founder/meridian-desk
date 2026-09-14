import Link from "next/link";
import { Frame } from "@/components/site/Frame";
import { CANONICAL_ANSWERS, ENTITY } from "@/lib/aeo/entity";

export default function HomePage() {
  return (
    <Frame>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <p className="text-xs uppercase tracking-[0.28em] text-brass-400">UHNW · Family office · Off-market</p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">One private desk for yachts, jets and estates.</h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-100/80">{ENTITY.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/desk" className="rounded-full bg-brass-500 px-6 py-3 text-ink-950">Request the desk</Link>
          <Link href="/method" className="rounded-full border border-ink-100/20 px-6 py-3">Read the method</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-4">
        {[["Private", "Off-market inventory. No public boards."], ["Direct", "Named advisor. Agents never impersonate the desk."], ["Fast", "Intake to shortlist in one run."], ["Trusted", "Human gate. People close, not models."]].map(([title, body]) => (
          <article key={title} className="border border-ink-100/10 p-6">
            <h2 className="font-serif text-2xl text-brass-300">{title}</h2>
            <p className="mt-3 text-sm text-ink-100/70">{body}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-serif text-3xl">Canonical answers</h2>
        <div className="mt-8 space-y-6">
          {CANONICAL_ANSWERS.map((item) => (
            <Link key={item.slug} href={`/answers/${item.slug}`} className="block border-t border-ink-100/10 pt-6">
              <h3 className="font-serif text-2xl">{item.q}</h3>
              <p className="mt-2 max-w-3xl text-ink-100/75">{item.a}</p>
            </Link>
          ))}
        </div>
      </section>
    </Frame>
  );
}
