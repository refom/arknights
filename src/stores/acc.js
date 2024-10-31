import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"

import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

// Sort: new, operator

const useAccStore = defineStore("acc", () => {
	// States
	const DATA = ref([])
	const SORT_PROPS = ref({
		new: {
			active: false,
			reverse: false,
		},
		operator: {
			active: false,
			reverse: false,
		},
	})
	const SEARCH_KEYWORD = ref("")
	const SEARCH_SIX_LENGTH = ref(0)

	// Getters
	const FILTERED = computed(() => {
		const OPERATOR_STORE = useOperatorStore()
		const TAG_STORE = useTagStore()
		let temp = DATA.value

		if (OPERATOR_STORE.SEARCH_OPERATOR.length) {
			temp = temp.filter((acc) => OPERATOR_STORE.SEARCH_OPERATOR.every((op) => acc.operator.includes(op)))
		}

		if (SEARCH_SIX_LENGTH.value) {
			temp = temp.filter((acc) => acc.six_op_length === SEARCH_SIX_LENGTH.value)
		}

		if (TAG_STORE.SEARCH_TAG.length) {
			temp = temp.filter((acc) => TAG_STORE.SEARCH_TAG.every((tag) => acc.tag.includes(tag)))
		}

		if (SEARCH_KEYWORD.value) {
			temp = temp.filter((acc) => 
				acc.id.toLowerCase().includes(SEARCH_KEYWORD.value.toLowerCase()) ||
				acc.operator.map((op) => OPERATOR_STORE.GetById(op).name.toLowerCase()).includes(SEARCH_KEYWORD.value.toLowerCase()) ||
				acc.tag.map((tag) => TAG_STORE.GetById(tag).name.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()).includes(SEARCH_KEYWORD.value.toLowerCase())
			)
		}

		return temp
	})

	// Actions
	const ClearSearchKeyword = () => SEARCH_KEYWORD.value = ""
	const SetSixLength = (length) => SEARCH_SIX_LENGTH.value = (SEARCH_SIX_LENGTH.value === length) ? 0 : length

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.acc)
		if (status === STATUS.BAD) return console.error(message)
		DATA.value = data
		Sort()
	}

	const Sort = () => {
		DATA.value = DATA.value.sort((a, b) => {
			const aDate = new Date(a.created_at)
			const bDate = new Date(b.created_at)

			if (SORT_PROPS.value.operator.active) {
				if (b.six_op_length > a.six_op_length) return SORT_PROPS.value.operator.reverse ? -1 : 1
				if (b.six_op_length < a.six_op_length) return SORT_PROPS.value.operator.reverse ? 1 : -1
			}

			if (SORT_PROPS.value.new.active) {
				if (bDate > aDate) return SORT_PROPS.value.new.reverse ? -1 : 1
				if (bDate < aDate) return SORT_PROPS.value.new.reverse ? 1 : -1
			}

			return bDate - aDate
		})
	}

	const SortBy = (prop) => {
		SORT_PROPS.value[prop].reverse = SORT_PROPS.value[prop].active && !SORT_PROPS.value[prop].reverse;
		SORT_PROPS.value[prop].active = !SORT_PROPS.value[prop].active || SORT_PROPS.value[prop].reverse;
		Sort()
	}

	const ResetSort = () => {
		SORT_PROPS.value.new.active = false
		SORT_PROPS.value.new.reverse = false
		SORT_PROPS.value.operator.active = false
		SORT_PROPS.value.operator.reverse = false
		Sort()
	}

	return {
		SORT_PROPS,
		SEARCH_KEYWORD,
		SEARCH_SIX_LENGTH,
		FILTERED,
		ClearSearchKeyword,
		SetSixLength,
		Fetch,
		SortBy,
		ResetSort,
	}
})

export { useAccStore }
