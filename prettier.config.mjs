/**
 * Reun Media Prettier configuration.
 *
 * @author Reun Media <company@reun.eu>
 * @copyright 2020 Reun Media
 *
 * @see https://github.com/ReunMedia/project-templates
 *
 * @version 5.2.0
 */

/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-packagejson",
    // "@zackad/prettier-plugin-twig", // Enable if using Twig
    // "prettier-plugin-tailwindcss", // Enable if using Tailwind
    "prettier-plugin-astro", // Enable if using Astro
  ],
  overrides: [
    // Enable if using Astro
    // {
    //   files: "*.astro",
    //   options: { parser: "astro" },
    // },
  ],
  // twigSingleQuote: false, // Enable if using Twig
};
