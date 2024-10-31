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
				class="wh-full rounded bg-light p-1 text-bismark-950 placeholder-bismark-950/70 transition-all hover:bg-apricot-100" />

			<!-- Clear Button -->
			<button
				@click="ClearFilter"
				class="light-mode h-full w-14 rounded px-1 transition-all hover:bg-light/50 active:bg-light/50">
				<IClose class="wh-full" />
			</button>
		</div>

		<!-- Sort by -->
		<div class="flex h-10 w-full items-center gap-3 px-3 font-oxanium">
			<div class="mr-5 flex h-full items-center">
				<ISort class="h-full" />
				<span
					class="mr-1 flex h-full flex-col justify-center text-lg font-medium leading-none">
					<p>Sort</p>
					<p>by</p>
				</span>
			</div>

			<button
				@click="ACC_STORE.SortBy('new')"
				:class="ActiveSort(ACC_STORE.SORT_PROPS.new.active)"
				class="flex h-full items-center gap-1 rounded-t border-b p-1 text-lg transition-all hover:bg-light hover:text-bismark-950">
				<ICalendar class="wh-full" />
				New
				<ICaretUp
					:class="ChangeCaret(ACC_STORE.SORT_PROPS.new.reverse)"
					class="h-3/4 w-3/4 transition-all" />
			</button>

			<button
				@click="ACC_STORE.SortBy('operator')"
				:class="ActiveSort(ACC_STORE.SORT_PROPS.operator.active)"
				class="flex h-full items-center gap-1 rounded-t border-b p-1 text-lg transition-all hover:bg-light hover:text-bismark-950">
				<IStar class="wh-full" />
				6
				<ICaretUp
					:class="ChangeCaret(ACC_STORE.SORT_PROPS.operator.reverse)"
					class="h-3/4 w-3/4 transition-all" />
			</button>
		</div>

		<!-- Six Star Count -->
		<div class="flex h-10 w-full gap-3 px-3">
			<div class="mr-5 flex h-full items-center">
				<IStar class="h-full" />
				<span
					class="mr-1 flex h-full flex-col justify-center text-lg font-medium leading-none">
					<p>Six</p>
					<p>Star</p>
				</span>
			</div>

			<button
				@click="ACC_STORE.SetSixLength(1)"
				:class="ActiveSixLength(1)"
				class="flex h-full items-center justify-center rounded-t border-b px-3 text-lg font-medium leading-none transition-all hover:bg-light hover:text-bismark-950">
				1
			</button>
			<button
				@click="ACC_STORE.SetSixLength(2)"
				:class="ActiveSixLength(2)"
				class="flex h-full items-center justify-center rounded-t border-b px-3 text-lg font-medium leading-none transition-all hover:bg-light hover:text-bismark-950">
				2
			</button>
		</div>

		<!-- Tags -->
		<div class="flex max-h-10 w-full gap-3 px-3">
			<div class="mr-5 flex h-10 items-center">
				<ITag class="h-full" />
				<span
					class="mr-1 flex h-full flex-col justify-center text-lg font-medium leading-none">
					<p>Tag</p>
				</span>
			</div>

			<div class="flex flex-wrap gap-2 overflow-hidden overflow-y-auto">
				<button
					v-for="tag in TAG_STORE.GetSorted"
					@click="TAG_STORE.AddSearchTag(tag.id)"
					:class="ActiveTag(tag)"
					class="flex h-10 items-center justify-center rounded-t border-b pr-2 font-oxanium text-lg font-medium leading-none text-bismark-950 transition-all hover:bg-light">
					<ITag class="ml-1 h-full w-7" />
					{{ tag.name }}
				</button>
			</div>
		</div>

		<!-- Operator Filter -->
		<div class="flex h-10 w-full gap-3 px-3">
			<div
				class="flex items-center w-full h-full gap-1">
				<button
					v-for="i in 6"
					@click="OPERATOR_STORE.SetFilterStar(i)"
					:class="ActiveFilterStar(i)"
					class="text-bismark-950 wh-full flex gap-1 justify-center items-center text-lg rounded-t border-b transition-all font-medium hover:bg-light">
					<IStar class="h-7 w-7" />
					{{ i }}
				</button>
			</div>
		</div>

		<!-- List Operator -->
		<SlideUpT direction="right">
			<div
				class="wh-full flex flex-wrap justify-center gap-1 overflow-y-auto overflow-x-hidden rounded bg-bismark-950">
				<OperatorCheckbox
					v-if="FilteredOperator.length"
					class="scale-95 ring ring-light"
					v-for="(op, index) in FilteredOperator"
					:key="op.id + index"
					:operator="op" />
				<OperatorCheckbox
					v-for="(op, index) in OPERATOR_STORE.FILTERED"
					:key="op.id + index"
					:operator="op" />
			</div>
		</SlideUpT>
	</div>
</template>

<script setup>
import { ref, computed, inject } from "vue"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

import SlideUpT from "@transitions/SlideUpT.vue"
import OperatorCheckbox from "@/components/Board/OperatorCheckbox.vue"

// Utils
const { RarityToStyle } = inject("utils")

// Stores
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const showOperator = ref(false)

// Getters
const FilteredOperator = computed(() =>
	OPERATOR_STORE.ListIdToObj(OPERATOR_STORE.SEARCH_OPERATOR),
)
const ChangeCaret = (value) => (value ? "rotate-180" : "rotate-0")
const ActiveSort = (value) => (value ? "bg-light text-bismark-950" : "")
const ActiveSixLength = (length) =>
	ACC_STORE.SEARCH_SIX_LENGTH === length ? "bg-light text-bismark-950" : ""
const ActiveTag = (tag) =>
	TAG_STORE.SEARCH_TAG.includes(tag.id)
		? "bg-light text-bismark-950"
		: RarityToStyle(tag.rarity)
const ActiveFilterStar = (star) =>
	OPERATOR_STORE.FILTER_STAR === star ? "bg-light" : RarityToStyle(star)

// Actions
const ClearFilter = () => {
	ACC_STORE.ClearSearchKeyword()
	OPERATOR_STORE.ClearSearchOperator()
	TAG_STORE.ClearSearchTag()
}
</script>
