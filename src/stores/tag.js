import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { GetApi, STATUS, END_API } from "@/assets/js/api";
import { dummyTag } from "@/assets/js/utils";

const useTagStore = defineStore("tag", () => {
	// States
	const DATA = ref([])
	const SEARCH_TAG = ref([])

	// Getters
	const FILTERED = computed(() => DATA.value.sort((a, b) => b.rarity - a.rarity))

	// Actions
	const GetById = (id) => DATA.value.find((tag) => tag.id === id) || dummyTag

	const ListIdToObj = (tagList) => {
		const temp = tagList.map((id) => GetById(id))
		return temp.sort((a, b) => b.rarity - a.rarity)
	}

	const AddSearchTag = (id) => {
		if (SEARCH_TAG.value.includes(id)) {
			SEARCH_TAG.value = SEARCH_TAG.value.filter((tag) => tag !== id)
			return
		}
		SEARCH_TAG.value.push(id)
	}

	const ClearSearchTag = () => {
		SEARCH_TAG.value = []
	}

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.tag)
		if (status === STATUS.BAD) return console.error(message)
		return DATA.value = data
	}

	return {
		DATA,
		SEARCH_TAG,
		FILTERED,
		AddSearchTag,
		ClearSearchTag,
		GetById,
		ListIdToObj,
		Fetch,
	}
})

export { useTagStore }