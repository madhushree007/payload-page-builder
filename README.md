# Payload Page Builder

A block-based website built with **Next.js (App Router)** and **Payload CMS 3**. Editors compose pages in the Payload admin panel from reusable blocks; Next.js renders them as statically generated pages.

## Features

- **Pages collection with blocks**: Hero, Rich Text (Lexical), Call to Action and Image
- **One dynamic route** (`[[...slug]]`) renders any page by its slug, with a typed block renderer
- **Static generation** with `generateStaticParams`
- **On-demand revalidation**: Payload `afterChange` / `afterDelete` hooks call `revalidatePath`, so published changes go live without a redeploy
- **Header global** for site name and navigation
- **Access control**: pages and the header are publicly readable; editing requires login
- **Postgres (Neon)** with database migrations, **Vercel Blob** for media in production

## Project structure

```
src/
├── app/(frontend)/[[...slug]]/page.tsx   # renders any page by slug
├── blocks/<Block>/config.ts             # block fields (Payload)
├── blocks/<Block>/Component.tsx         # block UI (React)
├── blocks/RenderBlocks.tsx              # maps blockType → component
├── collections/Pages.ts                 # pages + revalidation hooks
├── globals/Header.ts                    # site navigation
└── seed.ts                              # demo content
```

## Running locally

```bash
cp .env.example .env   # add your Postgres URL and a random secret
npm install
npm run dev            # http://localhost:3000, admin at /admin
npm run seed           # optional: demo pages and navigation
```

After changing collections or blocks, create a migration: `npm run payload migrate:create <name>`.

## Deploying (Vercel)

- Build command: `npm run ci` (runs migrations, then builds)
- Environment variables: `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`
