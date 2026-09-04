# Demark Landing Page

_Automatically synced with your [v0.dev](https://v0.dev) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/amantus/v0-demark-landing-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/xRUhtzJoMlW)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/amantus/v0-demark-landing-page](https://vercel.com/amantus/v0-demark-landing-page)**

## Build your app

For local development, use Node.js 22 or newer and the pnpm version pinned in
`package.json` (currently 11.25.0):

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Run the full verification before opening a pull request:

```sh
pnpm check
```

This builds the production app, checks formatting and types, runs the linter, and
runs the production HTTP smoke test. The test starts the built Next.js server on
an available loopback port, checks the landing page, JavaScript/CSS assets,
manifest icons, and a missing route, then stops the server. To rerun just the test
after building, use `pnpm test`.

GitHub Actions runs the same checks on pull requests and pushes to `main`, using
Node.js 24 and a frozen pnpm lockfile. Building downloads the Mona Sans font from
Google Fonts, so the build requires network access.

Continue building your app on:

**[https://v0.dev/chat/projects/xRUhtzJoMlW](https://v0.dev/chat/projects/xRUhtzJoMlW)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
