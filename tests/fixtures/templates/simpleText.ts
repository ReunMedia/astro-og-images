import { html } from "../../../src/html";

export default function simpleText(title: string, description: string) {
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
