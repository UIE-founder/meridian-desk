export type AssetClass = "yacht" | "jet" | "estate";
export type MandateSide = "acquire" | "dispose" | "charter" | "lease";
export type Visibility = "off_market" | "quiet" | "listed";
export type HumanProofLevel = "unverified" | "invite" | "officer" | "principal";
export type Currency = "USD" | "EUR" | "GBP" | "CHF";

export interface Money {
  amount: number;
  currency: Currency;
}

export interface Party {
  id: string;
  displayName: string;
  role: "principal" | "family_office" | "counsel" | "captain" | "advisor";
  humanProof: HumanProofLevel;
  office?: string;
}

export interface YachtSpec {
  class: "yacht";
  loaMeters: number;
  builder: string;
  year: number;
  cabins: number;
  guests: number;
  crew: number;
  flag: string;
  rangeNm: number;
  helicopter: boolean;
  location: string;
}

export interface JetSpec {
  class: "jet";
  type: string;
  manufacturer: string;
  year: number;
  seats: number;
  rangeNm: number;
  category: "light" | "midsize" | "super_midsize" | "heavy" | "ultra_long_range";
  baseAirport: string;
  argus?: string;
}

export interface EstateSpec {
  class: "estate";
  type: "compound" | "villa" | "townhouse" | "island" | "alpine" | "ranch";
  location: string;
  country: string;
  hectares?: number;
  bedrooms: number;
  staffQuarters: boolean;
  airstrip: boolean;
  dock: boolean;
}

export type AssetSpec = YachtSpec | JetSpec | EstateSpec;

export interface InventoryAsset {
  id: string;
  name: string;
  class: AssetClass;
  visibility: Visibility;
  asking?: Money;
  spec: AssetSpec;
  notes: string;
  carryingAnnual?: Money;
  confidentialOwnerId: string;
}

export interface MandateConstraints {
  class: AssetClass;
  side: MandateSide;
  budget?: { min?: Money; max?: Money };
  regions: string[];
  must: string[];
  mustNot: string[];
  timelineDays: number;
  privacy: "strict" | "standard";
}

export interface Mandate {
  id: string;
  principalId: string;
  officerId?: string;
  createdAt: string;
  status: "intake" | "matching" | "shortlist" | "diligence" | "term_sheet" | "closed" | "withdrawn";
  constraints: MandateConstraints;
  narrative: string;
}

export interface MatchScore {
  assetId: string;
  mandateId: string;
  total: number;
  axes: { use: number; economics: number; privacy: number; timing: number; ops: number };
  rationale: string[];
  risks: string[];
}

export interface DiligencePack {
  assetId: string;
  mandateId: string;
  questions: string[];
  counterparties: string[];
  jurisdictions: string[];
  nextHumanActions: string[];
}

export interface DeskSession {
  partyId: string;
  inviteCode: string;
  humanProof: HumanProofLevel;
  issuedAt: string;
}
