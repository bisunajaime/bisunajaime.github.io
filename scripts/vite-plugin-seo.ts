import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import { headTags, site } from "../src/seo";

const ROOT_EMPTY = '<div id="root"></div>';
const HEAD_PLACEHOLDER = "<!--seo-head-->";

/**
 * SEO for the single-page site:
 * - injects the <head> tags and JSON-LD from src/seo.ts into index.html (dev and build);
 * - prerenders the homepage into dist/index.html so crawlers and no-JS clients get the real content
 *   (the client then hydrates it; see src/main.tsx);
 * - writes dist/sitemap.xml, dated by the last commit that touched site content.
 */
export function seo(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "portfolio-seo",
    configResolved(resolved) {
      config = resolved;
    },
    transformIndexHtml(html) {
      if (!html.includes(HEAD_PLACEHOLDER)) throw new Error(`[portfolio-seo] ${HEAD_PLACEHOLDER} not found in index.html`);
      return html.replace(HEAD_PLACEHOLDER, headTags());
    },
    async closeBundle() {
      if (config.command !== "build" || config.build.ssr) return;
      const outDir = resolve(config.root, config.build.outDir);

      // Load the app through Vite's SSR loader so TSX and aliases resolve exactly as in the client build.
      const server = await createServer({
        root: config.root,
        configFile: false,
        plugins: [react()],
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        logLevel: "error",
      });
      try {
        const { render } = (await server.ssrLoadModule("/src/entry-server.tsx")) as { render: () => string };
        const file = resolve(outDir, "index.html");
        const html = readFileSync(file, "utf8");
        if (!html.includes(ROOT_EMPTY)) throw new Error(`[portfolio-seo] ${ROOT_EMPTY} not found in index.html`);
        writeFileSync(file, html.replace(ROOT_EMPTY, `<div id="root">${render()}</div>`));
        writeFileSync(resolve(outDir, "sitemap.xml"), sitemap(contentLastModified(config.root)));
      } finally {
        await server.close();
      }
    },
  };
}

/** YYYY-MM-DD of the last commit touching site content; the build date if git history isn't available. */
function contentLastModified(root: string) {
  try {
    const date = execSync("git log -1 --format=%cs -- src public index.html", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // no git in the build environment
  }
  return new Date().toISOString().slice(0, 10);
}

function sitemap(lastmod: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
}
