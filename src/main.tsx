import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root) {
  // Production HTML is prerendered at build time, so React attaches to it; the dev server serves an empty root.
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
