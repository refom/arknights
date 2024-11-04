import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { GetApi, STATUS, END_API } from "@/assets/js/api"

import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

const useAccStore = defineStore("acc", () => {
	// States
	const DATA = ref([])

	const SEARCH_ONLY_TAG = ref(false)
	const SEARCH_TAG = ref([])
	const SEARCH_OPERATOR = ref([])
	const SEARCH_SIX_LENGTH = ref(0)
	const SEARCH_KEYWORD = ref("")
	const SORT_NEW = ref(true)
	const SORT_SIX_LENGTH = ref({
		active: false,
		reverse: false,
	})

	// Getters
	const FILTERED = computed(() => {
		let temp = DATA.value

		temp = temp.sort((a, b) => {
			if (SORT_SIX_LENGTH.value.active) {
				if (b.six_op_length > a.six_op_length) return SORT_SIX_LENGTH.value.reverse ? -1 : 1
				if (b.six_op_length < a.six_op_length) return SORT_SIX_LENGTH.value.reverse ? 1 : -1
			}

			const aDate = new Date(a.created_at)
			const bDate = new Date(b.created_at)

			return !SORT_NEW.value ? aDate - bDate : bDate - aDate
		})

		if (SEARCH_OPERATOR.value.length) {
			temp = temp.filter((acc) => SEARCH_OPERATOR.value.every((op) => acc.operator.includes(op)))
		}

		if (SEARCH_SIX_LENGTH.value) {
			temp = temp.filter((acc) => acc.six_op_length === SEARCH_SIX_LENGTH.value)
		}

		if (SEARCH_TAG.value.length) {
			if (SEARCH_ONLY_TAG.value) {
				temp = temp.filter((acc) => acc.tag.sort().join(",") === SEARCH_TAG.value.sort().join(","))
			} else {
				temp = temp.filter((acc) => SEARCH_TAG.value.every((tag) => acc.tag.includes(tag)))
			}
		}

		const OPERATOR_STORE = useOperatorStore()
		const TAG_STORE = useTagStore()

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
	const SetSixLength = (length) => SEARCH_SIX_LENGTH.value = SEARCH_SIX_LENGTH.value === length ? 0 : length
	const SetOnlyTag = () => SEARCH_ONLY_TAG.value = !SEARCH_ONLY_TAG.value
	const ClearSearchKeyword = () => SEARCH_KEYWORD.value = ""
	const ClearSearchOperator = () => SEARCH_OPERATOR.value = []
	const ResetSearch = () => {
		ClearSearchKeyword()
		ClearSearchOperator()
		SetSixLength(0)
		SEARCH_TAG.value = []
		SORT_NEW.value = true
		SORT_SIX_LENGTH.value = {
			active: false,
			reverse: false,
		}
	}
	const SortNew = () => SORT_NEW.value = !SORT_NEW.value
	const SortSixLength = () => {
		SORT_SIX_LENGTH.value.reverse = SORT_SIX_LENGTH.value.active && !SORT_SIX_LENGTH.value.reverse;
		SORT_SIX_LENGTH.value.active = !SORT_SIX_LENGTH.value.active || SORT_SIX_LENGTH.value.reverse;
	}

	const Fetch = async () => {
		const { status, data, message } = await GetApi(END_API.acc)
		if (status === STATUS.BAD) return console.error(message)
		DATA.value = data
	}

	return {
		FILTERED,
		SEARCH_KEYWORD,
		SEARCH_SIX_LENGTH,
		SEARCH_TAG,
		SEARCH_OPERATOR,
		SORT_NEW,
		SORT_SIX_LENGTH,
		SEARCH_ONLY_TAG,
		ClearSearchKeyword,
		SetSixLength,
		SetOnlyTag,
		SortNew,
		SortSixLength,
		Fetch,
		ResetSearch,
	}
})

export { useAccStore }
