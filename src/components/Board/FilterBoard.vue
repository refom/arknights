<template>
	<div class="wh-full flex flex-col bg-bismark-900">
		<!-- Sort by -->
		<div class="my-3 flex h-10 w-full items-center gap-3 px-3 font-oxanium">
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

		<!-- Operator -->
		<div class="flex max-h-[30vh] w-full flex-col gap-3 px-3">
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
				<div v-if="showOperator" class="flex w-full flex-col gap-1">
					<div class="flex w-full gap-1">
						<button
							v-for="i in 6"
							@click="OPERATOR_STORE.SetFilterStar(i)"
							:class="$rarityToStyle(i)"
							class="light-mode wh-full flex items-center justify-center rounded active:opacity-70">
							<IStar class="h-5 w-5" />
							{{ i }}
						</button>
					</div>

					<div
						class="flex max-h-[30vh] flex-wrap w-full overflow-y-auto overflow-x-hidden justify-center rounded bg-bismark-950 gap-1">
						<OperatorCheckbox
							v-if="FilteredOperator.length"
							class="max-w-16 ring ring-light"
							v-for="(op, index) in FilteredOperator"
							:key="op.id + index"
							:operator="op" />
						<OperatorCheckbox
							class="max-w-16"
							v-for="(op, index) in OPERATOR_STORE.Filtered"
							:key="op.id + index"
							:operator="op" />
					</div>
				</div>
			</SlideUpT>
		</div>

		<!-- Tags -->
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"

import SlideUpT from "@transitions/SlideUpT.vue"
import OperatorCheckbox from "./OperatorCheckbox.vue"

// Stores
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()

// Variables
const showOperator = ref(false)

// Getters
const FilteredOperator = computed(() => {
	// ACC_STORE.Filter()
	return OPERATOR_STORE.ListIdToObj(OPERATOR_STORE.SEARCH_OPERATOR)
})
const ChangeCaret = (value) => (value ? "rotate-180" : "rotate-0")
const ActiveSort = (value) =>
	value ? "bg-rare-five text-primary" : "bg-bismark-950"
</script>
