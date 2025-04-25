import type { AstroIntegrationLogger } from "astro";
import satori, { type SatoriOptions as OriginalSatoriOptions } from "satori";
import sharp from "sharp";

interface Dimensions {
  width: number;
  height: number;
}

type SatoriOptions = Dimensions & OriginalSatoriOptions;

const templateToSvg = async (
  template: Template,
  satoriOptions: SatoriOptions,
) => {
  return await satori(template, satoriOptions);
};

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

interface RenderTemplateOptions {
  satoriOptions: SatoriOptions;
  sharpOptions?: sharp.SharpOptions;
}

export type Template = Parameters<typeof satori>[0];

/**
 * Render Satori template to a `.png` image
 */
const renderTemplate = async (
  template: Template,
  { satoriOptions, sharpOptions }: RenderTemplateOptions,
  logger?: AstroIntegrationLogger,
) => {
  logger?.debug("Rendering SVG with Satori");
  const svg = await templateToSvg(template, satoriOptions);
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

export { renderTemplate, templateToSvg, svgToPng };
