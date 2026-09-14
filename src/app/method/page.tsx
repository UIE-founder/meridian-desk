import type { Metadata } from "next";
import { Frame } from "@/components/site/Frame";
export const metadata: Metadata = { title: "Method" };
export default function MethodPage() {
  return (
    <Frame>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs uppercase tracking-[0.28em] text-brass-400">Operating method</p>
        <h1 className="mt-4 font-serif text-5xl">Agents match. People close.</h1>
        <ol className="mt-10 list-decimal space-y-4 pl-5 text-ink-100/80">
          <li>Gate. Invitation plus a proof-of-human step.</li>
          <li>Intake. Narrative first. Constraints stored as a mandate.</li>
          <li>Match. Score use, economics, privacy, timing and operations.</li>
          <li>Brief. Closed pack: questions, counterparties, next human actions.</li>
          <li>Close. Term sheets and viewings are human work.</li>
        </ol>
      </article>
    </Frame>
  );
}
