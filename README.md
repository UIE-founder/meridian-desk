# Meridian Desk

The first agentic brokerage for **superyachts, private jets and luxury estates**.

Private. Direct. Fast. Trusted. Real people. Agentic matching.

Meridian Desk connects verified UHNW principals and family offices. Software agents take a mandate, score off-market inventory and write a diligence pack. A named human owns the file and closes.

This repository is the working product: public citation pages, an invitation-only desk, and a deterministic agent graph you can run locally.

## Why it exists

Family offices still brief three firms for assets that have to work as one life. Public listings leak. Brokers who have never run the asset sell a fantasy. Online platforms are the wrong room. Bots now show up in the wrong room too.

Longer treatment: [`docs/PAIN_POINTS.md`](docs/PAIN_POINTS.md), [`docs/POSITIONING.md`](docs/POSITIONING.md).

## Principles in use

**WorldAuth-shaped gate.** Invitation now; passkeys and proof-of-human at the same interface later. Officers get scoped access. The matching layer sees constraints, not a marketing list.

**WorldAEO-shaped entity.** One name, one set of answers, schema, `llms.txt`. The public site is for citation. The desk is not indexed.

## Stack

- Next.js 15 App Router, TypeScript, Tailwind
- Zod intake
- Deterministic matcher + diligence writer (`src/lib/agents`)
- Cookie session for the demo desk
- No public inventory route

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Enter the desk with `MERIDIAN-FOUNDERS`.

```bash
npm test
npm run typecheck
```

## Repo map

```
src/app/                 public site + /desk + API
src/lib/agents/          intake, match, diligence, orchestrator
src/lib/auth/            human gate seam
src/lib/aeo/             entity + canonical answers
src/data/                anonymised seed inventory
docs/                    positioning, architecture, operating model
public/llms.txt          retrieval surface
```

## What "full stack" means here

The product is usable today as a desk simulation on seed assets. Production increments — Postgres, passkeys, World ID, reveal ledger, advisor roster — are sequenced in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). They are not mocked as if they already existed.

Agents do not negotiate and do not publish listings. If you add a model, put it behind the existing Zod schema.
