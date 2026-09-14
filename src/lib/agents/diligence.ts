import type { DiligencePack, InventoryAsset, Mandate } from "@/lib/domain/types";

export function buildDiligencePack(asset: InventoryAsset, mandate: Mandate): DiligencePack {
  const common = [
    "Confirm the principal is a verified human and the officer has written authority.",
    "Run source-of-funds and sanctions screening before any viewing.",
    "Do not circulate photographs, AIS tracks, tail numbers or addresses outside the desk.",
  ];
  if (asset.spec.class === "yacht") {
    return {
      assetId: asset.id,
      mandateId: mandate.id,
      jurisdictions: [asset.spec.flag, "buyer's holding jurisdiction", asset.spec.location],
      counterparties: ["owner's yacht counsel", "flag registry", "management company", "surveyor", "captain"],
      questions: [...common, "Is the vessel commercial, private, or dual-use, and has use changed mid-season?", "What is the condition of the last class survey and upcoming dry-dock window?", "Will the current crew transfer, and on what employment contracts?", "VAT, import and charter-licence implications of the intended programme."],
      nextHumanActions: ["Principal reviews the one-page brief with a named Meridian advisor.", "Advisor requests a closed viewing and sea trial under NDA.", "Counsel opens a term-sheet draft only after survey slots are held."],
    };
  }
  if (asset.spec.class === "jet") {
    return {
      assetId: asset.id,
      mandateId: mandate.id,
      jurisdictions: [asset.spec.baseAirport.slice(0, 2), "aircraft registry", "operator jurisdiction"],
      counterparties: ["owner's aviation counsel", "CAMO / management", "engine OEM records desk", "Part 135 operator if any"],
      questions: [...common, "Actual utilisation last 24 months versus the ownership thesis.", "Engine and APU status, upcoming inspections, and damage history.", "Will the aircraft stay Part 91 or move onto a managed / charter certificate?", "Hangar, crew and insurance continuity at the intended base."],
      nextHumanActions: ["Advisor commissions a records review before a physical inspection.", "Family office models 3-year carrying cost against charter and card alternatives.", "Named human negotiates exclusivity window, not an open bid process."],
    };
  }
  return {
    assetId: asset.id,
    mandateId: mandate.id,
    jurisdictions: [asset.spec.country, "buyer's holding jurisdiction"],
    counterparties: ["seller's counsel", "local notary / escrow", "surveyor", "staffing agent"],
    questions: [...common, "Title, easements, water and air rights, and any conservation constraints.", "Staff housing, seasonal occupancy rules, and local political risk.", "Can the estate take the family's aircraft or yacht as designed?", "What must remain unpublished even after closing."],
    nextHumanActions: ["Advisor arranges a no-photograph viewing with seller's counsel present.", "Family office confirms holding structure before a letter of intent.", "Principal decides; agents do not close without a named human."],
  };
}
