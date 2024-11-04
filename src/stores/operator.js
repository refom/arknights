import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"
import { dummyOperator } from "@/assets/js/utils"

const useOperatorStore = defineStore("operator", () => {
	// States
	const DATA = ref([])

	// Getters
	const FILTERED = computed(() => {
		let temp = DATA.value

		return temp.sort((a, b) => {
			if (b.rarity > a.rarity) return 1
			if (b.rarity < a.rarity) return -1

			if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
			if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
			return 0
		})
	})

	// Actions
	const GetById = (id) => DATA.value.find((op) => op.id === id) || dummyOperator
	const ListIdToObj = (opList) => {
		const temp = opList.map((id) => GetById(id))
		return temp.sort((a, b) => b.rarity - a.rarity)
	}

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.operator)
		if (status === STATUS.BAD) return console.error(message)
		return (DATA.value = data)
	}

	return {
		FILTERED,
		GetById,
		ListIdToObj,
		Fetch,
	}
})

export { useOperatorStore }
