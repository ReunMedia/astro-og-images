// @ts-check
import { defineConfig } from "astro/config";
import ogImages from "astro-og-images/integration";
import { resolve } from "path";
import { readFileSync } from "fs";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    ogImages({
      fonts: [
        {
          name: "Roboto",
          data: readFileSync(
            resolve(
              import.meta.dirname,
              "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff",
            ),
          ),
        },
      ],
    }),
  ],
});
