// @ts-check
import {readFile, readdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Two targets:
 * - Live site (Netlify / theduckpond.co.za): served from the domain root.
 * - Client demo on GitHub Pages (GITHUB_PAGES=true, set by the deploy
 *   workflow): served from /The-Duck-Pond-website-demo/, not indexed by
 *   Google, and the booking form hands requests to WhatsApp/email.
 */
const pages = process.env.GITHUB_PAGES === 'true';
const base = pages ? '/The-Duck-Pond-website-demo' : '';

/**
 * Pages link with root paths like href="/venues/". Under GitHub Pages they
 * need the repo prefix; Astro already prefixes its own assets, so this only
 * touches root links that don't have it yet.
 */
function prefixRootLinks() {
  return {
    name: 'prefix-root-links',
    hooks: {
      /** @param {{dir: URL}} opts */
      'astro:build:done': async ({dir}) => {
        if (!base) return;
        const root = fileURLToPath(dir);
        const attr = new RegExp(`(\\s(?:href|src|action)=")/(?!/|${base.slice(1)}/)`, 'g');
        /** @param {string} d */
        const walk = async (d) => {
          for (const e of await readdir(d, {withFileTypes: true})) {
            const p = join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (e.name.endsWith('.html')) {
              const html = await readFile(p, 'utf8');
              await writeFile(p, html.replace(attr, `$1${base}/`));
            }
          }
        };
        await walk(root);
      },
    },
  };
}

export default defineConfig({
  // Canonical URLs, Open Graph tags and the sitemap are all built from this.
  site: pages ? 'https://rolandvtonder.github.io' : 'https://theduckpond.co.za',
  base: base ? `${base}/` : undefined,
  trailingSlash: 'always',
  integrations: [sitemap({filter: (page) => !page.includes('/404') && !page.includes('/book/thanks')}), prefixRootLinks()],
  vite: {
    plugins: [tailwindcss()],
    define: {'import.meta.env.PUBLIC_DEMO': JSON.stringify(pages ? 'true' : '')},
  },
  image: {
    // Every photo is re-encoded to WebP at a few widths at build time.
    responsiveStyles: false,
  },
});
