# Swapnora Client

React and TypeScript frontend for the Swapnora charity and social-impact
platform.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The default development client runs at `http://localhost:5173`.

## Environment

```env
VITE_API_URL=http://localhost:8000/api
VITE_SOCKET_URL=http://localhost:8000
```

## Checks

```bash
npm run build
npm run lint
```

Do not commit `.env` or `.env.local` files.
