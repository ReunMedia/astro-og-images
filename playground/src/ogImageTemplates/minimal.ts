import { html } from "astro-og-images";

export default function minimal(text: string) {
  return html`
    <div style=${{ display: "flex" }}>
      <p>${text}</p>
    </div>
  `;
}
