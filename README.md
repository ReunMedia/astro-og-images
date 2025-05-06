# Astro OG Images

Yet another Astro integration to generate Open Graph images. More lightweight
than most alternatives.

> [!IMPORTANT]
>
> Only static build and dev mode are currently supported, but since dev mode
> uses on-demand rendering, a custom SSR implementation is possible.

## Getting started

### Install package

Usng `astro add`:

```sh
pnpm astro add @reunmedia/astro-og-images
```

Manually:

```sh
pnpm add @reunmedia/astro-og-images
```

### Configure integration

```mjs
// astro.config.mjs
import { defineConfig } from "astro/config";
import ogImages from "@reunmedia/astro-og-images";
import { readFile } from "fs/promises";

export default defineConfig({
  // OpenGraph images require a valid site configuration
  site: "https://example.com",
  integrations: [
    ogImages({
      // At least one font is required
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
import { html } from "@reunmedia/astro-og-images";

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
import { ogImage } from "@reunmedia/astro-og-images";
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

Since `ogImage()` simply returns an absolute URL, you can use the images for
other purposes such as [oEmbed](https://oembed.com/).

### Preview images during development

In development mode, `ogImage()` returns the full rendered image as a base64
encoded data URL. This allows you to preview the images during development using
various OpenGraph preview tools. You can even create your own image preview
using `<img>` tag:

```astro
---
import { ogImage } from "@reunmedia/astro-og-images";
import myTemplate from "../ogImageTemplates/myTemplate";

const image = await ogImage(myTemplate("Hello World!"));
---

<img style="max-width: 100%;" src={image} />
```

If you want to preview the HTML template during development, you can check out
[`OgTemplatePreview.astro`](./src/components/OgTemplatePreview.astro) component
as an example, however **you should always preview the rendered image**, because
some HTML may be rendered differently by Satori.

## Motivation

There are multiple OpenGraph image integrations for Astro already. Here's why
this one exists:

- Uses [sharp](https://github.com/lovell/sharp) instead of
  [resvg-js](https://github.com/thx/resvg-js) to render Satori SVG to PNG. Astro
  already uses sharp for image processing, so it makes sense to use the same
  package for OpenGraph images as well.
- Doesn't require (but supports) React. If you don't use React (or Preact),
  pulling a complete framework as a dependency just of OpenGraph images seems
  ovekill. Since [Satori also supports
  "React-elements-like-objeccts"](https://github.com/vercel/satori?tab=readme-ov-file#use-without-jsx)
  in addition to JSX, we use [htm](https://github.com/developit/htm) with a
  [custom renderer](src/html.ts) instead. JSX is supported by simply passing a
  JSX template to `ogImage()`.
- Doesn't rewrite output HTML and you get the URL before build is done. Other
  integrations work by manipulating `og:image` tags in the built HTML files.
  This makes it impossible to use the same (or different) image with `oEmbed`
  for example. Since this library gives you the resulting URL beforehand, you
  can even do things like display the image in `<img>` tag.
- Allows you to preview OG images during development. This feature is not unique
  to this library, but our implementation provides more flexibility.
