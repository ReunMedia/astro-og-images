// @ts-check
import { defineConfig } from "astro/config";
import ogImages from "astro-og-images";
import { readFile } from "fs/promises";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    ogImages({
      fonts: [
        {
          name: "Roboto",
          data: await readFile(
            "./node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff",
          ),
        },
      ],
    }),
  ],
});
