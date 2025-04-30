import { createHash } from "crypto";
import { IMAGE_ASSET_DIRECTORY } from "./integration.ts";
import type { Font, SatoriOptions } from "satori";
import { readFile } from "fs/promises";

/**
 * Create a hashed filename for a template.
 *
 * @param template Satori template
 * @returns string Template filename including asset directory
 */
const createTemplateFilename = (template: object): string => {
  // Naively hashes the result of JSON.stringify , since we expect the template
  // to be a simple object with no side effects.
  const hash = createHash("sha256")
    .update(JSON.stringify(template))
    .digest("base64url");
  const assetFilename = `${IMAGE_ASSET_DIRECTORY}/${hash}.png`;
  return assetFilename;
};

export type FontData = (Omit<Font, "data"> & {
  /**
   * Font data. If string is provided, font is loaded from a file by the
   * integration.
   *
   * ```js
   * fonts: [
   *    {
   *      name: "Inter",
   *      data: resolve(
   *        __dirname,
   *        "node_modules/@fontsource/inter/files/inter-latin-500-normal.woff"
   *      ),
   *    },
   *  ],
   * ```
   */
  data: SatoriOptions["fonts"][0]["data"] | string;
})[];

const loadFontData = async (
  fonts: FontData,
): Promise<SatoriOptions["fonts"]> => {
  const fonts2 = await Promise.all(
    await fonts.map(async (font) => {
      // We need to extract data to change its type, because TS doesn't seem to
      // narrow it if we just check `font.data` and return `font`.
      const { data, ...fontNoData } = font;

      if (typeof data !== "string") {
        return {
          ...fontNoData,
          data,
        };
      }

      return {
        ...fontNoData,
        data: await readFile(data),
      };
    }),
  );
  return fonts2;
};

export { createTemplateFilename, loadFontData };
