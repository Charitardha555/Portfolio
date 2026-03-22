# Stunning Portfolio

A Vercel-ready Next.js portfolio inspired by the product shape and visual energy of `satvik.live`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Auth.js with Google OAuth
- Prisma + Postgres

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Generate Prisma client and push schema:

```bash
npm run prisma:generate
npm run prisma:push
```

4. Seed starter content:

```bash
npm run prisma:seed
```

5. Start development:

```bash
npm run dev
```

## Deployment

- Create a Postgres database for production.
- Set all environment variables in Vercel.
- Ensure `ADMIN_EMAIL` matches the Google account allowed to access `/admin`.
