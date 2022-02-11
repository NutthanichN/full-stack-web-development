import adapter from '@sveltejs/adapter-auto';
// import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

// const adapter = require('@sveltejs/adapter-auto');
// const preprocess = require('svelte-preprocess');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      server: {
        hmr: {
          clientPort: process.env.HMR_HOST ? 443 : 3000,
          host: process.env.HMR_HOST ? process.env.HMR_HOST.substring("https://".length) : 'localhost'
        }
      }
    },
    methodOverride: {
      allowed: ['PUT', 'PATCH', 'DELETE']
    }
  }
};

export default config;
// module.exports = config;
