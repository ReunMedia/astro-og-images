import type { Font } from "satori";

export interface IntegrationOptions {
  /**
   * Default height for generated images in pixels.
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
  /**
   * Fonts used. At least one font is required.
   *
   * @example
   * ```ts
   * fonts: [
   *   {
   *     name: "Roboto",
   *     data: await readFile(
   *       "./node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff",
   *     ),
   *   },
   * ],
   * ```
   */
  fonts?: Font[];
}

const defaultOptions = {
  defaultHeight: 627,
  defaultWidth: 1200,
  fonts: [],
} satisfies IntegrationOptions;

export { defaultOptions };
