// @ts-check
import { defineConfig } from "astro/config";
import ogImages from "astro-og-images";
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
            "./node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff",
          ),
        },
      ],
    }),
  ],
});
