import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/desk-auth";
import { LoginForm } from "@/components/desk/LoginForm";
import { DeskShell } from "@/components/desk/DeskShell";

export const metadata = { title: "Desk", robots: { index: false, follow: false } };

export default async function DeskGate() {
  const session = await readSession();
  if (session) redirect("/desk/mandate");
  return (
    <DeskShell title="Enter the desk" eyebrow="Invitation">
      <p className="max-w-xl text-ink-100/75">The desk is not a marketplace. Use a Meridian invitation.</p>
      <LoginForm />
    </DeskShell>
  );
}
