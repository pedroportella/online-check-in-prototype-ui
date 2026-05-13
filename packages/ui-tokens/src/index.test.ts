import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { qldThemeTokens, transportStatusTokens } from "./index";

const sourceRoot = path.dirname(fileURLToPath(import.meta.url));

const readPackageFile = (...segments: string[]) =>
  readFileSync(path.join(sourceRoot, ...segments), "utf-8");

describe("@va/ui-tokens", () => {
  it("exports stable frontend token references", () => {
    expect(transportStatusTokens).toEqual({
      freeFlow: "var(--va-status-free-flow)",
      moderate: "var(--va-status-moderate)",
      congested: "var(--va-status-congested)",
      severe: "var(--va-status-severe)",
      freight: "var(--va-status-freight)",
      publicTransport: "var(--va-status-public-transport)",
    });

    expect(qldThemeTokens).toEqual({
      focus: "var(--QLD-color-light__focus)",
      heading: "var(--QLD-color-light__heading)",
      actionPrimary: "var(--QLD-color-light__action--primary)",
      background: "var(--QLD-color-light__background)",
    });
  });

  it("ships the CSS variables consumed by the app", () => {
    const styles = readPackageFile("styles.css");

    expect(styles).toContain("--va-status-free-flow");
    expect(styles).toContain("--va-status-public-transport");
    expect(styles).toContain("--QLD-color-light__action--primary");
    expect(styles).toContain("--QLD-color-dark__background");
  });

  it("keeps the VDS SCSS source entrypoints available", () => {
    expect(existsSync(path.join(sourceRoot, "scss/styles/primitive.scss"))).toBe(true);
    expect(existsSync(path.join(sourceRoot, "scss/styles/vds.scss"))).toBe(true);
    expect(existsSync(path.join(sourceRoot, "scss/styles/qld-default-palette.scss"))).toBe(true);

    expect(readPackageFile("scss/styles/primitive.scss")).toContain("$dimensionScale");
    expect(readPackageFile("scss/styles/vds.scss")).toContain("$buttonBorderRadius");
    expect(readPackageFile("scss/styles/qld-default-palette.scss")).toContain(
      "$buttonPaletteBrightPrimaryDefaultBackground",
    );
  });
});
