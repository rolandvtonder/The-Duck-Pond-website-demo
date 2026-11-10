// @ts-check
import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Canonical URLs, Open Graph tags and the sitemap are all built from this.
  site: 'https://theduckpond.co.za',
  trailingSlash: 'always',
  integrations: [sitemap({filter: (page) => !page.includes('/404') && !page.includes('/book/thanks')})],
  vite: {plugins: [tailwindcss()]},
  image: {
    // Every photo is re-encoded to WebP at a few widths at build time.
    responsiveStyles: false,
  },
});
