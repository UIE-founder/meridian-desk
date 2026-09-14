# Architecture

Keep the stack smaller than the claim.

Public web: `/` `/method` `/answers` — citation surface
Desk web: `/desk/*` — invitation only
API: `/api/auth` `/api/mandates`
Agents: intake → match → diligence → briefing
Store: cookies for the demo; Postgres later
Gate: invite now; World ID / passkey later

`runDesk(mandate)` is the only orchestrator. The matcher is deterministic on purpose. A later LLM planner may choose tools; it may not invent inventory or close.

Production increments: Postgres, passkeys, World ID, advisor roster, reveal ledger, optional model extraction behind Zod.

Do not add a public search grid, self-serve bidding, autonomous outreach, or scraped catalogues as the product.
