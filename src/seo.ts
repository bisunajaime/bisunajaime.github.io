// Single source of truth for <head> SEO tags and JSON-LD. Injected into index.html by
// scripts/vite-plugin-seo.ts (dev and build). Every value here must match what the page shows.
import { about, hero, links } from "./data/homepage";

export const site = {
  url: "https://bisunajaime.dev/",
  name: "Jose Jaime Bisuña",
  /** Spellings people search for; the ñ is often typed as n. */
  alternateNames: ["Jose Jaime Bisuna", "Jaime Bisuña", "Jaime Bisuna"],
  title: "Jose Jaime Bisuña | Full-Stack Developer in Metro Manila", // ~56 chars
  description:
    "Jose Jaime Bisuña (Bisuna) is a full-stack developer in Metro Manila, Philippines, building web and mobile products with React, TypeScript and .NET/C#.", // ~151 chars
  socialDescription:
    "Full-stack developer in Metro Manila, Philippines, building web and mobile products. Also written Jose Jaime Bisuna.",
  jobTitle: "Full-Stack Developer",
  locale: "en_US",
  language: "en",
  ogImage: {
    url: "https://bisunajaime.dev/og-image.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Jaime Bisuña, full-stack developer building web and mobile products",
  },
  // TODO(Jaime): this is the "JB" monogram. A real headshot (square, ≥ 512px) is a better Person image
  // for search results; add it to public/ and point this at it.
  personImage: "https://bisunajaime.dev/logo512.png",
};

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * JSON-LD graph: WebSite + ProfilePage whose main entity is the Person. The Person node (with the
 * alternate spellings and sameAs profiles) is the main lever for name searches: it ties this site to
 * the GitHub and LinkedIn profiles that already rank, as the same entity.
 */
export function structuredData() {
  const personId = `${site.url}#person`;
  const websiteId = `${site.url}#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: site.language,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}#profilepage`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.alternateNames,
        url: site.url,
        image: site.personImage,
        jobTitle: site.jobTitle,
        description: hero.lead,
        email: `mailto:${links.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Metro Manila", addressCountry: "PH" },
        sameAs: [links.github, links.linkedin],
        // The skills listed in the About section.
        knowsAbout: about.skills.flatMap((group) => group.items),
      },
    ],
  };
}

/** The SEO <head> tags as an HTML string. */
export function headTags() {
  const t = site;
  const json = JSON.stringify(structuredData(), null, 2).replace(/</g, "\\u003c");
  return [
    `<title>${esc(t.title)}</title>`,
    `<meta name="description" content="${esc(t.description)}" />`,
    `<meta name="author" content="${esc(t.name)}" />`,
    `<link rel="canonical" href="${t.url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(t.name)}" />`,
    `<meta property="og:title" content="${esc(t.title)}" />`,
    `<meta property="og:description" content="${esc(t.socialDescription)}" />`,
    `<meta property="og:url" content="${t.url}" />`,
    `<meta property="og:image" content="${t.ogImage.url}" />`,
    `<meta property="og:image:type" content="${t.ogImage.type}" />`,
    `<meta property="og:image:width" content="${t.ogImage.width}" />`,
    `<meta property="og:image:height" content="${t.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${esc(t.ogImage.alt)}" />`,
    `<meta property="og:locale" content="${t.locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.socialDescription)}" />`,
    `<meta name="twitter:image" content="${t.ogImage.url}" />`,
    `<meta name="twitter:image:alt" content="${esc(t.ogImage.alt)}" />`,
    `<script type="application/ld+json">\n${json}\n</script>`,
  ].join("\n    ");
}
