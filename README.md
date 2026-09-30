# Personal Budget Manager

Next.js multi-currency personal finance platform with a Budget AI assistant.

## Setup
1. Install Node.js 20.9+ and PostgreSQL 15+.
2. Copy `.env.example` to `.env.local` and configure `DATABASE_URL`, `AUTH_SECRET`, and optionally `OPENAI_API_KEY`.
3. Run `npm install`.
4. Run `npx prisma migrate dev --name init` and `npm run db:seed`.
5. Run `npm run dev`.

## Verification
`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Budget AI
The `/ai` page provides the Budget AI chat interface. Keep `OPENAI_API_KEY` server-side.
