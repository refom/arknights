import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { GetApi, STATUS, END_API } from "@/assets/js/api";

const useTagStore = defineStore("tag", () => {
	// States
	const DATA = ref([])

	// Actions
	const GetById = (id) => DATA.value.find((tag) => tag.id === id)

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
		GetTags,
		GetById,
		Fetch,
	}
})

export { useTagStore }