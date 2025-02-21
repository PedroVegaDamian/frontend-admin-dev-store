import { URL, fileURLToPath } from 'node:url'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vue({ template: { transformAssetUrls } }), quasar(), tailwindcss()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
