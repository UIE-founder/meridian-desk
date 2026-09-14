import { NextResponse } from "next/server";
import { IntakeSchema, mandateFromIntake } from "@/lib/agents/intake";
import { runDesk } from "@/lib/agents/orchestrator";
import { readSession } from "@/lib/auth/desk-auth";

export async function POST(request: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const parsed = IntakeSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const mandate = mandateFromIntake(parsed.data, session.partyId);
  const run = runDesk(mandate);
  const res = NextResponse.json({ ok: true, mandateId: mandate.id, top: run.matches.length });
  res.cookies.set("meridian_run", JSON.stringify(run), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 });
  return res;
}
