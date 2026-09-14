# Auth and the human gate

`MERIDIAN-FOUNDERS` issues a principal session.
`OFFICER-DEMO` issues a family-officer session.

Target pattern: invitation from a named advisor, passkey for the returning officer, proof-of-human for the remote principal. KYC happens in diligence, not at marketing signup.

The `HumanGate` interface in `src/lib/auth/desk-auth.ts` is the seam.
