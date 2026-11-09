import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://earthbbmp.github.io',
  trailingSlash: 'never',
  // work.html, not work/index.html
  build: { format: 'file' },
});
