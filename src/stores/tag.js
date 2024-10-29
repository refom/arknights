import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { GetApi, STATUS, END_API } from "@/assets/js/api";

const useTagStore = defineStore("tag", () => {
	// States
	const DATA = ref([])
	const SEARCH_TAG = ref([])

	// Actions
	const GetById = (id) => DATA.value.find((tag) => tag.id === id)

	const AddSearchTag = (id) => {
		if (SEARCH_TAG.value.includes(id)) {
			SEARCH_TAG.value = SEARCH_TAG.value.filter((tag) => tag !== id)
			return
		}
		SEARCH_TAG.value.push(id)
	}

	const GetTags = (tagList) => {
		const temp = tagList.map((id) => GetById(id))
		return temp.sort((a, b) => b.rarity - a.rarity)
	}

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.tag)
		if (status === STATUS.BAD) return console.error(message)
		return DATA.value = data
	}

	return {
		DATA,
		SEARCH_TAG,
		AddSearchTag,
		GetTags,
		GetById,
		Fetch,
	}
})

export { useTagStore }