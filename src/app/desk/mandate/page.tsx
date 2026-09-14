import { redirect } from "next/navigation";
import { DeskShell } from "@/components/desk/DeskShell";
import { MandateForm } from "@/components/desk/MandateForm";
import { readSession } from "@/lib/auth/desk-auth";

export const metadata = { title: "Mandate", robots: { index: false, follow: false } };

export default async function MandatePage() {
  const session = await readSession();
  if (!session) redirect("/desk");
  return (
    <DeskShell title="Write the mandate" eyebrow={`${session.humanProof} · ${session.partyId}`}>
      <p className="max-w-2xl text-ink-100/75">Describe the need in the principal's words. Nothing here is published.</p>
      <MandateForm />
    </DeskShell>
  );
}
