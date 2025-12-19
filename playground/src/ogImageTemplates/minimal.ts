import { html } from "@reunmedia/astro-og-images";
import type { Compiler } from "@reunmedia/astro-og-images";

export default function minimal(text: string): ReturnType<typeof html>;
export default function minimal<T>(text: string, compiler: Compiler<T>): T;
export default function minimal<T>(text: string, compiler?: Compiler<T>) {
  return (compiler || html) /* html */ `
      <div style=${{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
      }}>
        <p>${text}</p>
      </div>
    `;
}
