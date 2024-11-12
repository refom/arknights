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
		const opStore = useOperatorStore();
		const tagStore = useTagStore();
		const keyword = SEARCH_KEYWORD.value.toLowerCase();

		return DATA.value
			.filter(acc => {
				if (SEARCH_OPERATOR.value.length && !SEARCH_OPERATOR.value.every(op => acc.operator.includes(op))) return false;
				if (SEARCH_SIX_LENGTH.value && acc.six_op_length !== SEARCH_SIX_LENGTH.value) return false;

				if (SEARCH_TAG.value.length) {
					const accTags = acc.tag.sort().join(",");
					const searchTags = SEARCH_TAG.value.sort().join(",");
					if (SEARCH_ONLY_TAG.value && accTags !== searchTags) return false;
					if (!SEARCH_ONLY_TAG.value && !SEARCH_TAG.value.every(tag => acc.tag.includes(tag))) return false;
				}

				if (keyword) {
					const keywordMatch = acc.id.toLowerCase().includes(keyword) ||
						acc.operator.some(op => opStore.GetById(op).name.toLowerCase().includes(keyword)) ||
						acc.tag.some(tag => tagStore.GetById(tag).name.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().includes(keyword));
					if (!keywordMatch) return false;
				}

				return true;
			})
			.sort((a, b) => {
				if (SORT_SIX_LENGTH.value.active) {
					if (b.six_op_length > a.six_op_length) return SORT_SIX_LENGTH.value.reverse ? -1 : 1
					if (b.six_op_length < a.six_op_length) return SORT_SIX_LENGTH.value.reverse ? 1 : -1
				}
				return SORT_NEW.value ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at);
			});
	});

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
		DATA,
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
