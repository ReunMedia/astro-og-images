import htm from "htm";

/**
 * Custom renderer that creates "React-elements-like objects" to pass to Satori.
 *
 * @see https://github.com/vercel/satori?tab=readme-ov-file#use-without-jsx
 */
const html = htm.default.bind(
  (type: string, props: Object, ...children: any[]) => {
    return { type, props: { ...props, children } };
  },
);

export { html };
