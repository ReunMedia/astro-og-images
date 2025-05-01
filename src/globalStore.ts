import {
  defaultOptions,
  type IntegrationOptions,
} from "./IntegrationOptions.ts";
import type { SatoriTemplate, TemplateOptions } from "./ogImage.ts";
import type { renderTemplate } from "./renderTemplate.ts";

export interface StoredTemplate {
  templateOptions: TemplateOptions | undefined;
  satoriTemplate: SatoriTemplate;
  renderedTemplate: Awaited<ReturnType<typeof renderTemplate>> | undefined;
  assetFilename: string;
}

interface GlobalStore {
  /**
   * Templates to render during build.
   *
   * Keys represent asset filenames.
   */
  templates: Map<string, StoredTemplate>;
  integrationOptions: Required<IntegrationOptions>;
  /**
   * Controls inline rendering of templates.
   *
   * Enabled in dev mode, disabled otherwise.
   */
  renderInline: boolean;
}

declare global {
  /**
   * Global variable that stores integration data.
   *
   * Global variable is used so that data written in pages, layouts, components
   * etc. can be accessed during build phase.
   */
  // eslint-disable-next-line no-var
  var astroIntegrationOgimages: GlobalStore;
}

// Initialize global store
if (!globalThis.astroIntegrationOgimages) {
  globalThis.astroIntegrationOgimages = {
    templates: new Map(),
    integrationOptions: defaultOptions,
    renderInline: false,
  };
}

const globalStore = globalThis.astroIntegrationOgimages;

export default globalStore;
