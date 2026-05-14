# UI Architecture

The UI is a React application backed by local workspace packages.

`apps/check-in` renders the operational cockpit. `packages/services-check-in` owns the BFF client and dashboard types. `packages/ui-library`, `packages/ui-assets`, `packages/ui-tokens` and `packages/utils` provide the reusable design-system surface.

The UI has one data subscription:

```txt
React UI -> online-check-in-prototype-services -> simulator engine subscriptions
```

That keeps engine cadence, engine availability and telemetry consolidation outside the browser application.
