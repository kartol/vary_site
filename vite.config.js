// vite.config.js
import {sveltekit} from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    optimizeDeps: {
        include: ["dayjs/plugin/relativeTime.js"],
    },
    plugins: [sveltekit()]
};

export default config;
