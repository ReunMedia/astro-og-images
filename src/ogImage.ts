import { createTemplateFilename } from "./utils.ts";
import type satori from "satori";
import globalStore, { type StoredTemplate } from "./globalStore.ts";
import { renderTemplate } from "./renderTemplate.ts";

export interface TemplateOptions {
  /**
   * Override default width for this image.
   */
  customWidth?: number;
  /**
   * Override default height for this image.
   */
  customHeight?: number;
}

export type SatoriTemplate = Parameters<typeof satori>[0];

const ogImage = async (
  /**
   * Satori HTML template.
   */
  satoriTemplate: SatoriTemplate,
  templateOptions?: TemplateOptions,
  /**
   * Use inline rendering.
   *
   * Default: `true` when running dev server, `false` otherwise.
   */
  renderInline: boolean = globalStore.renderInline,
): Promise<string> => {
  const assetFilename = createTemplateFilename(satoriTemplate);

  // If template is not stored, create it
  if (!globalStore.templates.has(assetFilename)) {
    globalStore.templates.set(assetFilename, {
      templateOptions,
      satoriTemplate,
      assetFilename,
      renderedTemplate: undefined,
    });
  }

  // Get stored (or just created) template
  const storedTemplate = globalStore.templates.get(
    assetFilename,
  ) as StoredTemplate;

  // Render template if not yet rendered and inline rendering is requested
  if (renderInline && !storedTemplate.renderedTemplate) {
    storedTemplate.renderedTemplate = await renderTemplate(storedTemplate);
  }

  // If template is rendered inline, return it as data URL
  if (storedTemplate.renderedTemplate) {
    return `data:image/png;base64,${storedTemplate.renderedTemplate.toString("base64")}`;
  }

  // If it's going to be rendered to a file later, return the resulting file URL
  try {
    return new URL(`${assetFilename}`, globalStore.site).toString();
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error(
        "`Astro.site` config option must be set for OpenGraph images.",
      );
    }
    throw e;
  }
};

export { ogImage };
