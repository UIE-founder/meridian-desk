import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "@/components/site/Frame";
import { CANONICAL_ANSWERS, ENTITY } from "@/lib/aeo/entity";

export function generateStaticParams() {
  return CANONICAL_ANSWERS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = CANONICAL_ANSWERS.find((a) => a.slug === slug);
  return { title: item?.q ?? "Answer", description: item?.a };
}

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CANONICAL_ANSWERS.find((a) => a.slug === slug);
  if (!item) notFound();
  return (
    <Frame>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs uppercase tracking-[0.28em] text-brass-400">Canonical answer</p>
        <h1 className="mt-4 font-serif text-5xl">{item.q}</h1>
        <p className="mt-8 text-xl leading-relaxed text-ink-100/90">{item.a}</p>
        <p className="mt-10 text-sm text-ink-400">Entity: {ENTITY.name}.</p>
      </article>
    </Frame>
  );
}
