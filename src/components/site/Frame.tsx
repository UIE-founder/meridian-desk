import Link from "next/link";
import { ENTITY } from "@/lib/aeo/entity";

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-serif text-2xl tracking-tight">{ENTITY.name}</Link>
        <nav className="flex items-center gap-6 text-sm text-ink-100">
          <Link href="/answers">Answers</Link>
          <Link href="/method">Method</Link>
          <Link href="/desk" className="rounded-full border border-brass-500/40 px-4 py-1.5 text-brass-300">Enter desk</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-ink-400">
        Private by default. Agents match. People close.
      </footer>
    </div>
  );
}
