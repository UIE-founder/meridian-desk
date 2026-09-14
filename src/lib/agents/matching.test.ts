import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { matchMandate } from "./matching";
import type { Mandate } from "../domain/types";

const mandate = (): Mandate => ({
  id: "man-test",
  principalId: "p-founders",
  createdAt: new Date().toISOString(),
  status: "matching",
  narrative: "Quiet 50 metre Med yacht, off-market.",
  constraints: {
    class: "yacht",
    side: "acquire",
    budget: { max: { amount: 35_000_000, currency: "EUR" } },
    regions: ["Antibes", "Med"],
    must: ["Heesen"],
    mustNot: ["explorer"],
    timelineDays: 90,
    privacy: "strict",
  },
});

describe("matchMandate", () => {
  it("returns only the requested asset class", () => {
    const rows = matchMandate(mandate());
    assert.ok(rows.length > 0);
    assert.ok(rows.every((r) => r.asset.class === "yacht"));
  });
  it("ranks the on-brief Heesen above the explorer", () => {
    const rows = matchMandate(mandate());
    assert.equal(rows[0].asset.id, "yt-aurora-52");
  });
});
