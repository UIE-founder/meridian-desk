import Link from "next/link";
export function DeskShell({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-50">
      <header className="border-b border-ink-100/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="font-serif text-xl">Meridian Desk</Link>
          <nav className="flex gap-5 text-sm text-ink-100/80">
            <Link href="/desk/mandate">Mandate</Link>
            <Link href="/desk/matches">Matches</Link>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-12">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.28em] text-brass-400">{eyebrow}</p> : null}
        <h1 className="mt-3 font-serif text-4xl">{title}</h1>
        <div className="mt-8">{children}</div>
      </section>
    </div>
  );
}
