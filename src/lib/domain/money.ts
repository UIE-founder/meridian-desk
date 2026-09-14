import type { Money } from "./types";

export function formatMoney(m?: Money): string {
  if (!m) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: 0,
  }).format(m.amount);
}

export function withinBudget(asking: Money | undefined, max?: Money): boolean {
  if (!asking || !max) return true;
  if (asking.currency !== max.currency) return true;
  return asking.amount <= max.amount * 1.08;
}
