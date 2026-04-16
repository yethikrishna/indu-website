import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      remarkPlugins: [remarkGfm],
      highlight: {
        highlighter: async (code, lang) => {
          const { getHighlighter } = await import('shiki');
          const highlighter = await getHighlighter({
            themes: ['github-dark'],
            langs: [lang || 'text']
          });
          return highlighter.codeToHtml(code, {
            lang: lang || 'text',
            theme: 'github-dark'
          });
        }
      }
    })
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    alias: {
      '$components': './src/lib/components',
      '$stores': './src/lib/stores',
      '$server': './src/lib/server'
    }
  }
};

export default config;
