import type { Template } from "./renderTemplate.ts";
import { createTemplateFilename } from "./utils.ts";

declare global {
  /**
   * Global variable that stores integration data.
   *
   * Global variable is used so that data written in pages, layouts, components
   * etc. can be accessed during build phase.
   */
  // eslint-disable-next-line no-var
  var astroIntegrationOgimages: {
    /**
     * Templates to render during build.
     *
     * Keys represent asset filenames.
     */
    templates: Map<string, { template: Template } & TemplateOptions>;
  };
}

/**
 * Get templates to render
 */
const getTemplates = () => {
  return globalThis.astroIntegrationOgimages.templates;
};

interface TemplateOptions {
  /**
   * Override default width for this image.
   */
  customWidth?: number;
  /**
   * Override default height for this image.
   */
  customHeight?: number;
}

const ogImage = (
  /**
   * Satori HTML template.
   */
  template: Template,
  /**
   * Base URL for generated image file. Pass `Astro.site` here.
   */
  baseUrl?: string | URL,
  templateOptions?: TemplateOptions,
) => {
  if (!globalThis.astroIntegrationOgimages) {
    globalThis.astroIntegrationOgimages = {
      templates: new Map(),
    };
  }

  const assetFilename = createTemplateFilename(template);

  globalThis.astroIntegrationOgimages.templates.set(assetFilename, {
    template,
    ...templateOptions,
  });

  const url = baseUrl
    ? new URL(`${assetFilename}`, baseUrl).toString()
    : `/${assetFilename}`;
  return url;
};

export { ogImage, getTemplates };
