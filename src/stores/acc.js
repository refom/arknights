import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"

const useAccStore = defineStore("acc", () => {
	// States
	const DATA = ref([])

	// Getters
	const SortLatest = computed(() => {
		return DATA.value.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at),
		)
	})

	// Actions
	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.acc)
		if (status === STATUS.BAD) return console.error(message)
		return (DATA.value = data)
	}

	return {
		SortLatest,
		Fetch,
	}
})

export { useAccStore }
