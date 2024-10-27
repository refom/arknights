import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"

const useOperatorStore = defineStore("operator", () => {
	// States
	const DATA = ref([])

	// Actions
	const GetById = (id) => DATA.value.find((op) => op.id === id)

	const ListIdToObj = (opList) => opList.map((id) => GetById(id))
	// const GetOnlyRarity = (opList, rarity) => ListIdToObj(opList).filter((op) => op.rarity === rarity)
	const SortByRarity = (opList) => ListIdToObj(opList).sort((a, b) => b.rarity - a.rarity)

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.operator)
		if (status === STATUS.BAD) return console.error(message)
		return (DATA.value = data)
	}

	return {
		GetById,
		// GetOnlyRarity,
		SortByRarity,
		Fetch,
	}
})

export { useOperatorStore }
