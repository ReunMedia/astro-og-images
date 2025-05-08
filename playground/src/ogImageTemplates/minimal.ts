import { html } from "@reunmedia/astro-og-images";
import type { Renderer } from "../../../src/html";

function minimal(text: string): ReturnType<typeof html>;
function minimal<T>(text: string, renderer: Renderer<T>): T;

function minimal<T>(text: string, renderer?: Renderer<T>) {
  return (renderer || html)/* html */ `
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

export default minimal;
