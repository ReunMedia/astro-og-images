import { html } from "astro-og-images";

export default function getTemlate(title: string, description: string) {
  return html`
    <div
      style=${{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: 16,
        gap: "2em",
        background: "white",
      }}
    >
      <h1
        style=${{
          fontSize: "4em",
        }}
      >
        ${title}
      </h1>
      <p
        style=${{
          fontSize: "2em",
        }}
      >
        ${description}
      </p>
    </div>
  `;
}
