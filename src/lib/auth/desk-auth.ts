import { cookies } from "next/headers";
import type { DeskSession, HumanProofLevel } from "@/lib/domain/types";

export const INVITE_COOKIE = "meridian_desk";
export const DEFAULT_INVITE = process.env.MERIDIAN_INVITE_CODE ?? "MERIDIAN-FOUNDERS";

export function proofFromInvite(code: string): HumanProofLevel {
  if (code === DEFAULT_INVITE) return "principal";
  if (code.startsWith("OFFICER-")) return "officer";
  if (code.startsWith("MERIDIAN-")) return "invite";
  return "unverified";
}

export function issueSession(code: string): DeskSession | null {
  const humanProof = proofFromInvite(code.trim());
  if (humanProof === "unverified") return null;
  return {
    partyId: humanProof === "officer" ? "p-officer" : "p-founders",
    inviteCode: code.trim(),
    humanProof,
    issuedAt: new Date().toISOString(),
  };
}

export async function readSession(): Promise<DeskSession | null> {
  const jar = await cookies();
  const raw = jar.get(INVITE_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DeskSession;
    if (!parsed.humanProof || parsed.humanProof === "unverified") return null;
    return parsed;
  } catch {
    return null;
  }
}

export interface HumanGate {
  provider: "invite" | "world_id" | "passkey";
  verify(token: string): Promise<{ ok: boolean; level: HumanProofLevel }>;
}

export const inviteGate: HumanGate = {
  provider: "invite",
  async verify(token: string) {
    const session = issueSession(token);
    return session ? { ok: true, level: session.humanProof } : { ok: false, level: "unverified" };
  },
};
