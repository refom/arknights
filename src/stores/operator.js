import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"

const useOperatorStore = defineStore("operator", () => {
	// States
	const DATA = ref([])
	const FILTER_STAR = ref(0)
	const SEARCH_OPERATOR = ref([])

	// Getters
	const FILTERED = computed(() => {
		let temp = DATA.value
		if (SEARCH_OPERATOR.value.length > 0) {
			temp = temp.filter((op) => !SEARCH_OPERATOR.value.includes(op.id))
		}

		if (FILTER_STAR.value !== 0) {
			temp = temp.filter((op) => op.rarity === FILTER_STAR.value)
		}

		return temp.sort((a, b) => {
			if (b.rarity > a.rarity) return 1
			if (b.rarity < a.rarity) return -1

			if (a.name > b.name) return 1
			if (a.name < b.name) return -1
			return 0
		})
	})

	// Actions
	const GetById = (id) =>
		DATA.value.find((op) => op.id === id) ||
		{
			id: "w",
			name: "Operator Example",
			rarity: 6,
		}
	const SetFilterStar = (star) => FILTER_STAR.value = (FILTER_STAR.value === star) ? 0 : star

	const ListIdToObj = (opList) => opList.map((id) => GetById(id))
	const SortByRarity = (opList) => ListIdToObj(opList).sort((a, b) => b.rarity - a.rarity)

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.operator)
		if (status === STATUS.BAD) return console.error(message)
		return (DATA.value = data)
	}

	return {
		SEARCH_OPERATOR,
		FILTER_STAR,
		FILTERED,
		GetById,
		SetFilterStar,
		SortByRarity,
		ListIdToObj,
		Fetch,
	}
})

export { useOperatorStore }
