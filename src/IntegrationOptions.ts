import type { Font } from "satori";

export interface IntegrationOptions {
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
  fonts?: Font[];
}

const defaultOptions = {
  defaultHeight: 627,
  defaultWidth: 1200,
  fonts: [],
} satisfies IntegrationOptions;

export { defaultOptions };
