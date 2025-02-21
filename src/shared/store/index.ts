import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'dark' | 'light' | 'system'

interface GlobalStore {
	theme: Theme
}

export const useGlobalStore = defineStore('global', () => {
	const theme = ref<GlobalStore['theme']>('system')

	function setTheme(newTheme: GlobalStore['theme']) {
		theme.value = newTheme
	}

	return { theme, setTheme }
})
