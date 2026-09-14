import { NextResponse } from "next/server";
import { INVITE_COOKIE, issueSession } from "@/lib/auth/desk-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { code?: string };
  const session = issueSession(body.code ?? "");
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true, humanProof: session.humanProof });
  res.cookies.set(INVITE_COOKIE, JSON.stringify(session), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
  return res;
}
