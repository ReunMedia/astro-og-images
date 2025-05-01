import type { AstroIntegrationLogger } from "astro";
import satori, { type SatoriOptions as OriginalSatoriOptions } from "satori";
import sharp from "sharp";
import type { SatoriTemplate } from "./ogImage.ts";
import type { StoredTemplate } from "./globalStore.ts";
import globalStore from "./globalStore.ts";

interface Dimensions {
  width: number;
  height: number;
}

type SatoriOptions = Dimensions & OriginalSatoriOptions;

/**
 * Render a Satori template to SVG
 *
 * @returns SVG data
 */
const templateToSvg = async (
  satoriTemplate: SatoriTemplate,
  satoriOptions: SatoriOptions,
) => {
  return await satori(satoriTemplate, satoriOptions);
};

/**
 * Render SVG string to PNG using Sharp
 *
 * @param svg SVG data
 *
 * @returns PNG data
 */
const svgToPng = async (
  svg: string,
  dimensions: Dimensions,
  sharpOptions?: sharp.SharpOptions,
) => {
  return await sharp(Buffer.from(svg), sharpOptions)
    .resize({ width: dimensions.width, height: dimensions.height })
    .png()
    .toBuffer();
};

export interface RenderTemplateOptions {
  satoriOptions: SatoriOptions;
  sharpOptions?: sharp.SharpOptions;
}

/**
 * Render Satori template to a `.png` image
 */
const renderSatoriTemplate = async (
  satoriTemplate: SatoriTemplate,
  { satoriOptions, sharpOptions }: RenderTemplateOptions,
  logger?: AstroIntegrationLogger,
) => {
  logger?.debug("Rendering SVG with Satori");
  const svg = await templateToSvg(satoriTemplate, satoriOptions);
  logger?.debug("Rendering completed");

  logger?.debug("Converting SVG to PNG with Sharp");
  const png = await svgToPng(
    svg,
    {
      width: satoriOptions.width,
      height: satoriOptions.height,
    },
    sharpOptions,
  );
  logger?.debug("Converting completed");

  return png;
};

const renderTemplate = async (
  storedTemplate: StoredTemplate,
  logger?: AstroIntegrationLogger,
): ReturnType<typeof renderSatoriTemplate> => {
  // Render template if it's not rendered yet
  if (!storedTemplate.renderedTemplate) {
    const options = {
      satoriOptions: {
        height:
          storedTemplate.templateOptions?.customHeight ??
          globalStore.integrationOptions.defaultHeight,
        width:
          storedTemplate.templateOptions?.customWidth ??
          globalStore.integrationOptions.defaultWidth,
        fonts: globalStore.integrationOptions.fonts,
      },
    };

    storedTemplate.renderedTemplate = await renderSatoriTemplate(
      storedTemplate.satoriTemplate,
      options,
      logger,
    );
  }

  return storedTemplate.renderedTemplate;
};

export { renderTemplate };
