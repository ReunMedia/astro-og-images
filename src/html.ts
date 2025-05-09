import htm from "htm";

/**
 * Compiler type used for type-safe HTML template preview.
 */
export type Compiler<T> = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => T;

/**
 * Custom compiler that creates "React-elements-like objects" to pass to Satori.
 *
 * This can be used to avoid React as dependency.
 *
 * @see https://github.com/vercel/satori?tab=readme-ov-file#use-without-jsx
 */
const html = htm.bind((type: string, props: object, ...children: unknown[]) => {
  return { type, props: { ...props, children } };
});

export { html };
