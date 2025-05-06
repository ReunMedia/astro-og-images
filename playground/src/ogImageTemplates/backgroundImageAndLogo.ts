import { html } from "@reunmedia/astro-og-images";
import bgData from "../assets/ogBg.png?url&inline";
import logo from "../assets/ogLogo.svg";
import logoData from "../assets/ogLogo.svg?url&inline";

export default function backgroundImage(title: string, description: string) {
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
        background: `url(${bgData})`,
        color: "white",
      }}
    >
      <img
        width=${logo.width}
        height=${logo.height}
        src=${logoData}
        style=${{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      />
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
