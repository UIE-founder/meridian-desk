import { INVENTORY } from "@/data/inventory";
import { withinBudget } from "@/lib/domain/money";
import type { InventoryAsset, Mandate, MatchScore } from "@/lib/domain/types";

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function regionHit(asset: InventoryAsset, regions: string[]): number {
  if (regions.length === 0) return 70;
  const hay = `${asset.name} ${asset.notes} ${JSON.stringify(asset.spec)}`.toLowerCase();
  const hits = regions.filter((r) => hay.includes(r.toLowerCase())).length;
  if (hits === 0) return 35;
  return 70 + Math.min(30, hits * 15);
}

function mustScore(asset: InventoryAsset, must: string[], mustNot: string[]): { score: number; notes: string[] } {
  const hay = `${asset.name} ${asset.notes} ${JSON.stringify(asset.spec)}`.toLowerCase();
  const notes: string[] = [];
  let score = 80;
  for (const m of must) {
    if (hay.includes(m.toLowerCase())) notes.push(`Matches required signal: ${m}`);
    else {
      score -= 18;
      notes.push(`Missing required signal: ${m}`);
    }
  }
  for (const m of mustNot) {
    if (hay.includes(m.toLowerCase())) {
      score -= 40;
      notes.push(`Conflicts with exclusion: ${m}`);
    }
  }
  return { score: clamp(score), notes };
}

function economics(asset: InventoryAsset, mandate: Mandate): number {
  const max = mandate.constraints.budget?.max;
  if (!asset.asking) return 55;
  if (!max) return 60;
  if (!withinBudget(asset.asking, max)) return 25;
  const ratio = asset.asking.amount / max.amount;
  return clamp(100 - Math.abs(ratio - 0.82) * 80);
}

function privacyScore(asset: InventoryAsset, mandate: Mandate): number {
  const map = { off_market: 100, quiet: 78, listed: 42 } as const;
  let score = map[asset.visibility];
  if (mandate.constraints.privacy === "strict" && asset.visibility === "listed") score -= 30;
  return clamp(score);
}

function opsScore(asset: InventoryAsset): number {
  if (asset.spec.class === "yacht") {
    return clamp(60 + (asset.spec.helicopter ? 10 : 0) + Math.min(20, asset.spec.rangeNm / 400));
  }
  if (asset.spec.class === "jet") {
    return { light: 50, midsize: 62, super_midsize: 70, heavy: 78, ultra_long_range: 88 }[asset.spec.category];
  }
  return clamp(55 + (asset.spec.airstrip ? 15 : 0) + (asset.spec.dock ? 10 : 0) + (asset.spec.staffQuarters ? 8 : 0));
}

export function scoreAsset(asset: InventoryAsset, mandate: Mandate): MatchScore {
  const useBase = asset.class === mandate.constraints.class ? 92 : 8;
  const region = regionHit(asset, mandate.constraints.regions);
  const must = mustScore(asset, mandate.constraints.must, mandate.constraints.mustNot);
  const use = clamp(useBase * 0.7 + region * 0.3);
  const econ = economics(asset, mandate);
  const privacy = privacyScore(asset, mandate);
  const timing = mandate.constraints.timelineDays <= 45 ? 70 : 82;
  const ops = opsScore(asset);
  const total = clamp(use * 0.32 + econ * 0.22 + privacy * 0.18 + timing * 0.1 + ops * 0.18 + (must.score - 80) * 0.15);
  const rationale = [
    `Asset class ${asset.class} vs mandate ${mandate.constraints.class}`,
    `Visibility: ${asset.visibility.replace("_", " ")}`,
    ...must.notes,
  ];
  const risks: string[] = [];
  if (asset.visibility === "listed" && mandate.constraints.privacy === "strict") {
    risks.push("Asset has been publicly listed; anonymity of interest is weaker.");
  }
  if (asset.carryingAnnual && mandate.constraints.budget?.max && asset.carryingAnnual.amount > mandate.constraints.budget.max.amount * 0.08) {
    risks.push("Annual carrying cost is material relative to stated capital budget.");
  }
  if (asset.spec.class === "estate" && asset.spec.country === "France") {
    risks.push("French residential acquisition needs early counsel on structure and occupancy.");
  }
  return { assetId: asset.id, mandateId: mandate.id, total, axes: { use, economics: econ, privacy, timing, ops }, rationale, risks };
}

export function matchMandate(mandate: Mandate): { asset: InventoryAsset; score: MatchScore }[] {
  return INVENTORY.map((asset) => ({ asset, score: scoreAsset(asset, mandate) }))
    .filter((row) => row.asset.class === mandate.constraints.class)
    .sort((a, b) => b.score.total - a.score.total);
}
