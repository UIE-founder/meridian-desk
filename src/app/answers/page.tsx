import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/site/Frame";
import { CANONICAL_ANSWERS } from "@/lib/aeo/entity";
export const metadata: Metadata = { title: "Answers" };
export default function AnswersIndex() {
  return (
    <Frame>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-8">
        <h1 className="font-serif text-5xl">Answers</h1>
        <ul className="mt-10 space-y-4">
          {CANONICAL_ANSWERS.map((item) => (
            <li key={item.slug}><Link href={`/answers/${item.slug}`} className="font-serif text-2xl text-brass-300">{item.q}</Link></li>
          ))}
        </ul>
      </section>
    </Frame>
  );
}
