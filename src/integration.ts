import type { AstroIntegration } from "astro";
import { join, normalize } from "path";
import { mkdir, writeFile } from "fs/promises";
import globalStore from "./globalStore.ts";
import {
  defaultOptions,
  type IntegrationOptions,
} from "./IntegrationOptions.ts";
import { renderTemplate } from "./renderTemplate.ts";

/**
 * Directory inside Astro's build asset directory to store generated images.
 */
export const IMAGE_ASSET_DIRECTORY = "_ogimages";

const createPlugin = (options?: IntegrationOptions): AstroIntegration => {
  const integrationOptions = {
    ...defaultOptions,
    ...options,
  };
  globalStore.integrationOptions = integrationOptions;
  return {
    name: "ogimages",
    hooks: {
      "astro:config:setup": ({ config, logger, command }) => {
        if (command === "dev") {
          logger.debug("Running in dev server. Inline rendering enabled.");
          // Enable inline rendering in dev mode.
          globalStore.renderInline = true;
        }

        globalStore.site = config.site ?? "";
      },
      "astro:build:done": async ({ dir, logger }) => {
        logger.info(`Rendering ${globalStore.templates.size} OpenGraph images`);

        logger.debug(`Creating directory to store images`);
        await mkdir(join(dir.pathname, IMAGE_ASSET_DIRECTORY));

        // Render all templates to files
        await Promise.all(
          Array.from(globalStore.templates).map(
            async ([assetFilename, storedTemplate]) => {
              const assetPath = normalize(join(dir.pathname, assetFilename));
              logger.debug(`Rendering template to ${assetPath}`);
              await writeFile(
                assetPath,
                await renderTemplate(storedTemplate, logger),
              );
            },
          ),
        );
        logger.info(`OpenGraph images rendered`);
      },
    },
  };
};

export default createPlugin;
