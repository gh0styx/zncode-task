# Orders & Products Inventory

Frontend test task implementation for an inventory SPA with Orders and Products pages.

## Features

- Next.js + React + TypeScript application with route pages: `/orders`, `/products`, `/login`.
- Redux Toolkit global state for inventory, selected order, delete modal, filters, and session data.
- Bootstrap + SCSS/BEM styling matched to the supplied inventory screenshots.
- Socket.io active browser tab counter in the top menu.
- REST endpoints: `/api/orders`, `/api/products`, `/api/auth/login`.
- Minimal GraphQL endpoint: `/api/graphql` with `orders`, `products`, and `order(id)` queries.
- Demo JWT login with form validation and Web Storage persistence.
- Route/component animations, lazy-loaded panels/insights, PWA manifest/service worker.
- Charts, order-product graph, map-style warehouse card, Web Worker aggregates.
- Unit/component/e2e test setup and Docker packaging.
- MySQL-compatible schema in `database/schema.sql`.

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

Demo login:

- Email: `demo@inventory.test`
- Password: `inventory`

## Checks

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Docker

```bash
docker compose up --build
```

The application is available at [http://localhost:3000](http://localhost:3000).

## GraphQL Examples

```graphql
query {
  orders {
    id
    title
  }
}
```

```graphql
query Order($id: Int!) {
  order(id: $id) {
    id
    title
    products {
      id
      title
    }
  }
}
```
