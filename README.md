# Orders & Products Inventory

SPA for orders and products inventory.

## Requirements

- Node.js 22+
- npm 11+
- Docker Desktop for container verification

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000/orders](http://localhost:3000/orders).

## Checks

```bash
npm run lint
npm run biome:check
npm run test
npm run test:e2e
npm run build
```

## Deployment Variables

For a separated frontend and backend deployment, set this variable on the frontend:

```bash
NEXT_PUBLIC_SOCKET_URL=https://api.example.com
```

Set this variable on the backend:

```bash
SOCKET_CORS_ORIGIN=https://app.example.com
```

## Docker

```bash
docker compose up --build
```

The application is available at [http://localhost:3000](http://localhost:3000).
