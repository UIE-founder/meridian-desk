import { z } from "zod";
import type { AssetClass, Mandate, MandateSide } from "@/lib/domain/types";

export const IntakeSchema = z.object({
  class: z.enum(["yacht", "jet", "estate"]),
  side: z.enum(["acquire", "dispose", "charter", "lease"]),
  budgetMax: z.coerce.number().positive().optional(),
  currency: z.enum(["USD", "EUR", "GBP", "CHF"]).default("EUR"),
  regions: z.string().default(""),
  must: z.string().default(""),
  mustNot: z.string().default(""),
  timelineDays: z.coerce.number().int().positive().default(90),
  privacy: z.enum(["strict", "standard"]).default("strict"),
  narrative: z.string().min(12),
});

export type IntakeInput = z.infer<typeof IntakeSchema>;

function splitList(value: string): string[] {
  return value.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
}

export function mandateFromIntake(input: IntakeInput, principalId: string): Mandate {
  return {
    id: `man-${Date.now()}`,
    principalId,
    createdAt: new Date().toISOString(),
    status: "matching",
    narrative: input.narrative,
    constraints: {
      class: input.class as AssetClass,
      side: input.side as MandateSide,
      budget: input.budgetMax ? { max: { amount: input.budgetMax, currency: input.currency } } : undefined,
      regions: splitList(input.regions),
      must: splitList(input.must),
      mustNot: splitList(input.mustNot),
      timelineDays: input.timelineDays,
      privacy: input.privacy,
    },
  };
}
