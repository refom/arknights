<template>
	<div
		class="wh-full flex flex-col gap-3 pt-3">
		<!-- Sort by -->
		<div class="flex h-10 w-full items-center gap-3 px-3 font-oxanium">
			<div class="flex h-full items-center rounded bg-bismark-950 px-1">
				<ISort class="h-7 w-7" />
				<span class="mr-1 flex flex-col font-medium leading-none">
					<p>Sort</p>
					<p>by</p>
				</span>
			</div>

			<button
				@click="ACC_STORE.SortBy('new')"
				:class="ActiveSort(ACC_STORE.SORT_PROPS.new.active)"
				class="wh-full flex items-center justify-center gap-1 rounded px-3 transition-all">
				<ICalendar class="h-7 w-7" />
				New
				<ICaretUp
					:class="ChangeCaret(ACC_STORE.SORT_PROPS.new.reverse)"
					class="h-5 w-5 transition-all" />
			</button>

			<button
				@click="ACC_STORE.SortBy('operator')"
				:class="ActiveSort(ACC_STORE.SORT_PROPS.operator.active)"
				class="wh-full flex items-center justify-center gap-1 rounded px-3 transition-all">
				<IStar class="h-7 w-7" />
				6
				<ICaretUp
					:class="ChangeCaret(ACC_STORE.SORT_PROPS.operator.reverse)"
					class="h-5 w-5 transition-all" />
			</button>
		</div>

		<!-- Six Star Count -->
		<div class="flex w-full justify-center gap-3 px-3">
			<button
				@click="ACC_STORE.SetSixLength(1)"
				:class="ActiveSixLength(1)"
				class="flex justify-center rounded px-1 font-medium text-primary transition-all">
				1 x 6
				<IStar class="h-5 w-5" />
			</button>
			<button
				@click="ACC_STORE.SetSixLength(2)"
				:class="ActiveSixLength(2)"
				class="flex justify-center rounded px-1 font-medium text-primary transition-all">
				2 x 6
				<IStar class="h-5 w-5" />
			</button>
		</div>

		<!-- Tags -->
		<div class="flex flex-wrap w-full justify-center gap-3 px-3">
			<button
				v-for="tag in TAG_STORE.DATA"
				@click="TAG_STORE.AddSearchTag(tag.id)"
				:class="ActiveTag(tag)"
				class="flex items-center rounded px-1 font-oxanium font-medium text-primary transition-all">
				<ITag class="w-5 h-5" />
				{{ tag.name }}
			</button>
		</div>

		<!-- Operator -->
		<div class="flex max-h-[37vh] w-full flex-col gap-3 px-3">
			<!-- Search -->
			<div class="flex h-10 w-full gap-1">
				<input
					v-model="ACC_STORE.SEARCH_KEYWORD"
					type="text"
					name="search"
					placeholder="Search Acc..."
					class="w-full rounded bg-light p-1 text-primary placeholder-primary/50 hover:bg-apricot-100" />

				<!-- Clear Button -->
				<button
					@click="ACC_STORE.ClearSearchKeyword"
					class="light-mode flex w-14 items-center rounded px-1 active:bg-light/50">
					<IClose class="wh-full" />
				</button>

				<!-- Show Operator -->
				<button
					@click="showOperator = !showOperator"
					class="light-mode w-14 select-none rounded transition-all active:bg-light/50">
					<ICaretRight
						:class="ChangeCaret(!showOperator)"
						class="wh-full transition-all duration-500" />
				</button>
			</div>

			<!-- List Operator -->
			<SlideUpT direction="left">
				<div v-if="showOperator" class="flex wh-full flex-col gap-1 overflow-hidden">
					<div class="flex w-full gap-1">
						<button
							v-for="i in 6"
							@click="OPERATOR_STORE.SetFilterStar(i)"
							:class="ActiveFilterStar(i)"
							class="light-mode wh-full flex justify-center rounded transition-all">
							<IStar class="h-5 w-5" />
							{{ i }}
						</button>
					</div>

					<div
						class="flex wh-full flex-wrap justify-center gap-1 overflow-y-auto overflow-x-hidden rounded bg-bismark-950">
						<OperatorCheckbox
							v-if="FilteredOperator.length"
							class="ring ring-light scale-95"
							v-for="(op, index) in FilteredOperator"
							:key="op.id + index"
							:operator="op" />
						<OperatorCheckbox
							v-for="(op, index) in OPERATOR_STORE.FILTERED"
							:key="op.id + index"
							:operator="op" />
					</div>
				</div>
			</SlideUpT>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, inject } from "vue"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

import SlideUpT from "@transitions/SlideUpT.vue"
import OperatorCheckbox from "./OperatorCheckbox.vue"

// Utils
const { RarityToStyle } = inject("utils")

// Stores
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const showOperator = ref(false)

// Getters
const FilteredOperator = computed(() => OPERATOR_STORE.ListIdToObj(OPERATOR_STORE.SEARCH_OPERATOR))
const ChangeCaret = (value) => (value ? "rotate-180" : "rotate-0")
const ActiveSort = (value) =>
	value ? "bg-rare-five text-primary" : "bg-bismark-950"
const ActiveSixLength = (length) =>
	ACC_STORE.SEARCH_SIX_LENGTH === length ? "bg-light" : "bg-rare-six"
const ActiveTag = (tag) => TAG_STORE.SEARCH_TAG.includes(tag.id) ? "bg-light" : RarityToStyle(tag.rarity)
const ActiveFilterStar = (star) => OPERATOR_STORE.FILTER_STAR === star ? "bg-light" : RarityToStyle(star)
</script>
