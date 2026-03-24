This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Telegram sign-in + ngrok (local HTTPS)

The [Telegram Login Widget](https://core.telegram.org/widgets/login) only works when the page origin matches the bot domain in @BotFather. Plain `localhost` often fails; use **ngrok** to get an HTTPS URL.

1. Install [ngrok](https://ngrok.com/download) and sign in (`ngrok config add-authtoken …` from the dashboard).
2. Start Next.js: `npm run dev` (port **3000** by default).
3. In another terminal: `ngrok http 3000`
4. Copy the **HTTPS** URL (e.g. `https://abc123.ngrok-free.app`).
5. In @BotFather: **Domain** (or `/setdomain`) → set **only** the hostname, e.g. `abc123.ngrok-free.app` (no `https://`).
6. In `.env.local` set `AUTH_URL` to that HTTPS base URL (no trailing slash), e.g. `AUTH_URL=https://abc123.ngrok-free.app`
7. Restart `npm run dev` and open the app **via the ngrok URL**, not localhost — e.g. `https://abc123.ngrok-free.app/auth/signin`

When the ngrok URL changes, update BotFather **and** `AUTH_URL`. If the API runs only on localhost, either expose the backend with another ngrok tunnel and set `NEXT_PUBLIC_API_URL`, or test only pages that do not call the API.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
