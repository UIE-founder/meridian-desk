import type { Party } from "@/lib/domain/types";

export const PARTIES: Party[] = [
  { id: "p-founders", displayName: "Founding principal", role: "principal", humanProof: "principal", office: "Family office — Geneva" },
  { id: "p-officer", displayName: "Chief of staff", role: "family_office", humanProof: "officer", office: "Family office — Geneva" },
];
