# Online Check-in Prototype UI

React, TypeScript and pnpm workspace prototype for the Virgin Australia online check-in delivery cockpit.

The UI subscribes to one BFF API, `online-check-in-prototype-services`, and presents consolidated journey, flight and telemetry status without talking directly to simulator engines.

## What It Demonstrates

- Vite React application for the operational check-in cockpit.
- Reusable VDS-style packages for assets, tokens, UI components, utilities and service clients.
- Dashboard controls for release focus, workstream and journey stages.
- Telemetry awareness for two simulator engines through the BFF dashboard contract.
- Docker image for static Nginx hosting.
- GitHub Actions validation for typecheck, tests, build and Docker build.

## Repository Structure

```txt
apps/check-in/                 React application
packages/services-check-in/    BFF client and shared dashboard types
packages/ui-library/           Layout and design-system components
packages/ui-assets/            Logos and icon assets
packages/ui-tokens/            Design tokens and generated CSS
packages/utils/                Shared utility helpers
```

## Runtime Requirements

- Node.js 20.19+.
- pnpm 9.15.4 via Corepack.
- `online-check-in-prototype-services` on `http://127.0.0.1:7003` for live BFF data.

## Local Setup

```bash
corepack enable
pnpm install
pnpm dev
```

The UI runs at `http://127.0.0.1:7001`.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_CHECK_IN_API_BASE` | `http://127.0.0.1:7003` | BFF base URL used by `@va/services-check-in` |

## Verification

```bash
pnpm typecheck
pnpm test
pnpm build
```

## Docker

```bash
docker compose up --build
```

The container serves the built UI at `http://127.0.0.1:7001`.

## CI/CD

`.github/workflows/ci.yml` runs on pushes, pull requests and manual dispatch. It installs pnpm dependencies, runs typecheck, tests, production build and a Docker build.
