import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	base: "/arknights/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@icons": fileURLToPath(new URL("./src/components/Icons", import.meta.url)),
			"@transitions": fileURLToPath(new URL("./src/components/Transitions", import.meta.url)),
		},
	},
})
