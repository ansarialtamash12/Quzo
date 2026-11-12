// Writes robots.txt and sitemap.xml into build/ using the production domain.
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const site = (process.env.REACT_APP_SITE_URL || "").replace(/\/+$/, "");
if (!/^https:\/\//.test(site)) {
  console.error("REACT_APP_SITE_URL must be set to the https:// production domain.");
  process.exit(1);
}

const out = path.join(__dirname, "..", "build");
const today = new Date().toISOString().slice(0, 10);

fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
);
