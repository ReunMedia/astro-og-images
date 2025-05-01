# Astro OG Images

Yet another Astro integration to generate Open Graph images. More lightweight
than most alternatives.

> [!IMPORTANT]
>
> Only static build is currently supported.

## Getting started

### Install package

Usng `astro add`:

```sh
pnpm astro add astro-og-images
```

Manually:

```sh
pnpm add astro-og-images
```

### Configure integration

```mjs
// astro.config.mjs
import { defineConfig } from "astro/config";
import ogImages from "astro-og-images";
import { resolve } from "path";
import { readFileSync } from "fs";

export default defineConfig({
  // OpenGraph images require a valid site configuration
  site: "https://example.com",
  integrations: [
    ogImages({
      // At least one font is required
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
```

See [`IntegrationOptions.ts`](./src/IntegrationOptions.ts) for more
configuration options.

## Usage

> [!TIP]
>
> See [Playground](./playground) for a complete Astro example project.

### Create a template

```ts
// src/ogImageTemplates/myTemplate.ts
import { html } from "astro-og-images";

export default function myTemplate(text: string) {
  return html`
    <div style=${{ display: "flex" }}>
      <p>${text}</p>
    </div>
  `;
}
```

See [Playground templates](./playground/src/ogImageTemplates) for additional
examples.

Astro OG Images uses [`htm`](https://github.com/developit/htm) for templating by
default to avoid requiring React as a dependency, but you may [use
JSX](https://github.com/vercel/satori?tab=readme-ov-file#jsx) as well.

### Add image OpenGraph property

```astro
---
import { ogImage } from "astro-og-images";
import myTemplate from "../ogImageTemplates/myTemplate";

// ogImage returns absolute URL to rendered image
const image = await ogImage(myTemplate("Hello World!"));
---

<html lang="en">
  <head>
    <meta property="og:image" content={ogImage} />
  </head>
  ...
</html>
```

Since `ogImage()` simply returns an absolute URL, you can reuse the same image
for other purposes (such as [oEmbed](https://oembed.com/)).

### Preview images during development

In development mode, `ogImage()` returns the full rendered image as a base64
encoded data URL. This allows you to preview the images during development using
various OpenGraph preview tools. You can even create your own image preview
using `<img>` tag:

```astro
---
import { ogImage } from "astro-og-images";
import myTemplate from "../ogImageTemplates/myTemplate";

const image = await ogImage(myTemplate("Hello World!"));
---

<img style="max-width: 100%;" src={image} />
```

If you want to preview the HTML template during development, you can check out
[`OgTemplatePreview.astro`](./src/components/OgTemplatePreview.astro) component
as an example, however **you should always preview the rendered image**, because
some HTML may be rendered differently by Satori.
