import { createHash } from "crypto";
import { IMAGE_ASSET_DIRECTORY } from "./integration.ts";

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

export { createTemplateFilename };
