import type { AstroIntegration } from "astro";
import { getTemplates } from "./ogImage.ts";
import { renderTemplate } from "./renderTemplate.ts";
import { join, normalize } from "path";
import { mkdir, writeFile } from "fs/promises";
import { loadFontData, type FontData } from "./utils.ts";

/**
 * Directory inside Astro's build asset directory to store generated images.
 */
export const IMAGE_ASSET_DIRECTORY = "_ogimages";

export type OgImageOptions = {
  /**
   * Default width for generated images in pixels.
   *
   * @default 627
   */
  defaultHeight?: number;
  /**
   * Default width for generated images in pixels.
   *
   * @default 1200
   */
  defaultWidth?: number;
  fonts?: FontData | never[];
};

const defaultOptions = {
  defaultHeight: 627,
  defaultWidth: 1200,
  fonts: [],
} satisfies OgImageOptions;

const createPlugin = (options?: OgImageOptions): AstroIntegration => {
  const { defaultHeight, defaultWidth } = { ...defaultOptions, ...options };
  let { fonts } = { ...defaultOptions, ...options };
  return {
    name: "ogimages",
    hooks: {
      "astro:config:setup": ({ logger }) => {
        logger.info("astro:config:setup");
      },
      "astro:build:done": async ({ dir, logger }) => {
        const templates = getTemplates();

        logger.debug(`Loading font data for Satori`);
        const satoriFonts = await loadFontData(fonts);

        logger.debug(`Creating directory to store images`);
        await mkdir(join(dir.pathname, IMAGE_ASSET_DIRECTORY));

        await Promise.all(
          Array.from(templates).map(async ([assetFilename, templateData]) => {
            const assetPath = normalize(join(dir.pathname, assetFilename));
            logger.debug(`Rendering template to ${assetPath}`);
            const renderedImage = await renderTemplate(
              templateData.template,
              {
                satoriOptions: {
                  height: templateData.customHeight ?? defaultHeight,
                  width: templateData.customWidth ?? defaultWidth,
                  fonts: satoriFonts,
                },
              },
              logger,
            );

            await writeFile(assetPath, renderedImage);
          }),
        );
        logger.debug(`All images rendered`);
      },
    },
  };
};

export default createPlugin;
