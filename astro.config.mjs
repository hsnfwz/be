// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bebybenjampapp.vercel.app',
  integrations: [sitemap()],
  security: {
    // Emits a <meta http-equiv="Content-Security-Policy"> with per-build hashes
    // for inline content, so the JSON-LD block is allowlisted by hash rather
    // than by 'unsafe-inline'. frame-ancestors is deliberately absent — it is
    // ignored in a <meta> CSP, and is enforced by X-Frame-Options in vercel.json.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
  markdown: {
    // No markdown content in this project; Shiki's inline styles would only
    // conflict with the CSP above.
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
