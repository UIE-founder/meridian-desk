import { INVENTORY } from "@/data/inventory";
import type { DiligencePack, Mandate, MatchScore } from "@/lib/domain/types";
import { buildDiligencePack } from "./diligence";
import { matchMandate } from "./matching";

export interface AgentEvent {
  at: string;
  agent: "intake" | "matcher" | "diligence" | "briefing" | "compliance";
  message: string;
}

export interface DeskRun {
  mandate: Mandate;
  matches: { name: string; visibility: string; score: MatchScore }[];
  packs: DiligencePack[];
  events: AgentEvent[];
  humanOwner: string;
}

export function runDesk(mandate: Mandate): DeskRun {
  const events: AgentEvent[] = [
    { at: new Date().toISOString(), agent: "intake", message: "Mandate accepted. Privacy set to " + mandate.constraints.privacy + "." },
    { at: new Date().toISOString(), agent: "compliance", message: "Principal must present invite + human proof before counterparties are named." },
  ];
  const ranked = matchMandate(mandate);
  events.push({ at: new Date().toISOString(), agent: "matcher", message: `Scored ${ranked.length} ${mandate.constraints.class} assets.` });
  const top = ranked.slice(0, 3);
  const packs = top.map(({ asset }) => buildDiligencePack(asset, mandate));
  events.push({ at: new Date().toISOString(), agent: "diligence", message: "Prepared closed briefing packs." });
  events.push({ at: new Date().toISOString(), agent: "briefing", message: "Hand-off to a named advisor. Agents do not speak to sellers." });
  return {
    mandate,
    matches: top.map(({ asset, score }) => ({ name: asset.name, visibility: asset.visibility, score })),
    packs,
    events,
    humanOwner: "Named Meridian advisor — not an automated closer",
  };
}

export function getAsset(id: string) {
  return INVENTORY.find((a) => a.id === id);
}
