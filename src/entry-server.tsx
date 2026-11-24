import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./app/App";

/** Renders the homepage to HTML at build time (see scripts/vite-plugin-seo.ts). */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
