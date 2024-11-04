<template>
	<div
		class="mt-3 flex max-h-max w-full flex-col gap-3 rounded-r bg-bismark-950 p-3">
		<!-- Search Bar -->
		<div class="mt-3 flex h-10 w-full items-center gap-1 px-3">
			<input
				v-model="ACC_STORE.SEARCH_KEYWORD"
				type="text"
				name="search"
				placeholder="Search..."
				class="h-full w-full bg-light p-1 text-bismark-950 placeholder-bismark-950/70 transition-all hover:bg-apricot-100" />

			<!-- Clear Button -->
			<button
				@click="ACC_STORE.ResetSearch"
				class="light-mode h-full w-14 px-1 transition-all hover:bg-apricot-100 active:bg-light/50">
				<IClose class="wh-full" />
			</button>
		</div>

		<!-- Sort by -->
		<div
			class="flex h-10 w-full gap-1 items-center justify-center px-3 font-oxanium font-semibold">
			<button
				@click="ACC_STORE.SortNew"
				:class="ActiveSort(!ACC_STORE.SORT_NEW)"
				class="flex h-full items-center p-1 transition-all hover:bg-light hover:text-bismark-950">
				<ICalendar class="h-7 w-7" />
				<ICaretUp
					:class="ChangeCaret(!ACC_STORE.SORT_NEW)"
					class="h-7 w-7 transition-all" />
			</button>

			<button
				@click="ACC_STORE.SortSixLength"
				:class="ActiveSort(ACC_STORE.SORT_SIX_LENGTH.active)"
				class="flex h-full items-center p-1 transition-all hover:bg-light hover:text-bismark-950">
				<IStar class="h-7 w-7 text-rare-six" />
				<ICaretUp
					:class="ChangeCaret(ACC_STORE.SORT_SIX_LENGTH.reverse)"
					class="h-7 w-7 transition-all" />
			</button>

			<button
				@click="ACC_STORE.SetSixLength(1)"
				:class="ActiveSixLength(1)"
				class="hover:light-mode flex h-full items-center gap-1 px-3 py-1 transition-all">
				1
				<IStar class="h-7 w-7 text-rare-six" />
			</button>

			<button
				@click="ACC_STORE.SetSixLength(2)"
				:class="ActiveSixLength(2)"
				class="hover:light-mode flex h-full items-center gap-1 px-3 py-1 transition-all">
				2
				<IStar class="h-7 w-7 text-rare-six" />
			</button>
		</div>

		<!-- Six Star Count -->
		<div class="flex h-10 w-full gap-1 px-3 font-oxanium justify-center">
			<TagCheckbox
				v-model="ACC_STORE.SEARCH_TAG"
				v-for="tag in TagChecked"
				:tag="tag"
				class="py-2 ring ring-light" />
			<TagCheckbox
				v-model="ACC_STORE.SEARCH_TAG"
				v-for="tag in TagList"
				:tag="tag"
				class="py-2" />
		</div>

		<!-- Operator Filter -->
		<div class="flex w-full items-center gap-1 px-3">
			<button
				v-for="i in 6"
				@click="SetFilterStar(i)"
				:class="ActiveFilterStar(i)"
				class="light-mode hover:light-mode flex w-full justify-center py-1 transition-all">
				<IStar class="h-5 w-5" />
				{{ i }}
			</button>
		</div>

		<!-- List Operator -->
			<div
				class="flex w-full flex-wrap justify-center gap-1 overflow-y-auto overflow-x-hidden bg-bismark-950">
				<OperatorCheckbox
					v-model="ACC_STORE.SEARCH_OPERATOR"
					v-for="op in OperatorChecked"
					:key="op.id"
					:operator="op"
					class="ring ring-light" />
				<OperatorCheckbox
					v-model="ACC_STORE.SEARCH_OPERATOR"
					v-for="op in OperatorList"
					:key="op.id"
					:operator="op" />
			</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { RarityToStyle } from "@/assets/js/utils"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

import SlideT from "@transitions/SlideT.vue"
import OperatorCheckbox from "@/components/Board/OperatorCheckbox.vue"
import TagCheckbox from "@/components/tag/TagCheckbox.vue"

// Stores
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const filterStar = ref(0)
const searchOperator = ref("")

// Getters
const TagList = computed(() =>
	TAG_STORE.FILTERED.filter((tag) => !ACC_STORE.SEARCH_TAG.includes(tag.id)),
)
const TagChecked = computed(() => TAG_STORE.ListIdToObj(ACC_STORE.SEARCH_TAG))
const OperatorChecked = computed(() =>
	OPERATOR_STORE.ListIdToObj(ACC_STORE.SEARCH_OPERATOR),
)
const OperatorList = computed(() => {
	let temp = OPERATOR_STORE.FILTERED

	if (searchOperator.value.length > 0) {
		temp = temp.filter((op) =>
			op.name.toLowerCase().includes(searchOperator.value.toLowerCase()),
		)
	}

	if (ACC_STORE.SEARCH_OPERATOR.length > 0) {
		temp = temp.filter((op) => !ACC_STORE.SEARCH_OPERATOR.includes(op.id))
	}

	if (filterStar.value !== 0) {
		temp = temp.filter((op) => op.rarity === filterStar.value)
	}

	return temp
})

// Actions
const ChangeCaret = (value) => (value ? "rotate-180" : "rotate-0")
const ActiveSort = (value) => (value ? "bg-light text-bismark-950" : "")
const ActiveSixLength = (length) =>
	ACC_STORE.SEARCH_SIX_LENGTH === length ? "bg-light text-bismark-950" : ""
const ActiveFilterStar = (value) =>
	filterStar.value === value ? "bg-light" : RarityToStyle(value)
const SetFilterStar = (star) =>
	(filterStar.value = filterStar.value === star ? 0 : star)
</script>
