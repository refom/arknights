<template>
	<div
		class="w-full flex flex-col gap-3 mt-3 px-3">
		<div class="flex w-full justify-center font-semibold gap-2">
			Found
			<span class="text-rare-six">
				{{ ACC_STORE.FILTERED.length }}
			</span>
			Acc
		</div>

		<!-- Sort by -->
		<div class="flex flex-col w-full gap-1 justify-center font-oxanium">
			<button
				@click="showSort = !showSort"
				class="flex h-full py-1 items-center justify-center font-semibold light-mode w-full active:dark-mode transition">
				<ISort class="h-7 w-7" />
				Sort by
			</button>

			<SlideT direction="right" >
				<div
					v-if="showSort"
					class="flex justify-center w-full gap-1">
					<button
						@click="ACC_STORE.SortNew"
						:class="ActiveSort(!ACC_STORE.SORT_NEW)"
						class="h-full w-full flex items-center justify-center py-1 transition-all">
						<ICalendar class="h-7 w-7" />
						<ICaretUp
							:class="ChangeCaret(!ACC_STORE.SORT_NEW)"
							class="h-7 w-7 transition-all" />
					</button>

					<button
						@click="ACC_STORE.SortSixLength"
						:class="ActiveSort(ACC_STORE.SORT_SIX_LENGTH.active)"
						class="h-full w-full flex items-center justify-center py-1 transition-all">
						<IStar class="h-7 w-7 text-rare-six" />
						<ICaretUp
							:class="ChangeCaret(ACC_STORE.SORT_SIX_LENGTH.reverse)"
							class="h-7 w-7 transition-all" />
					</button>
				</div>
			</SlideT>
		</div>

		<!-- Tags -->
		<div class="flex flex-col w-full justify-center gap-1">
			<button
				@click="showTag = !showTag"
				class="flex h-full py-1 items-center justify-center font-oxanium font-semibold light-mode w-full active:dark-mode transition">
				<ITag class="h-7 w-7 p-1" />
				Tags
			</button>

			<SlideT direction="right">
				<div
					v-if="showTag"
					class="flex flex-col gap-1 justify-center w-full">
					<!-- Six Star Length -->
					<div class="flex justify-center w-full font-semibold">
						<button
							v-for="i in SixLengthPossible"
							@click="ACC_STORE.SetSixLength(i)"
							:class="ActiveSixLength(i)"
							class="flex w-full h-full justify-center gap-1 py-2 transition-all">
							{{ i }}
							<IStar class="h-5 w-5 text-rare-six" />
						</button>
					</div>
	
					<!-- Tags -->
					<div class="flex flex-wrap w-full justify-center gap-1 font-oxanium font-medium">
						<button
							@click="ACC_STORE.SetOnlyTag"
							:class="ActiveTag(ACC_STORE.SEARCH_ONLY_TAG)"
							class="font-bold p-2 active:dark-mode">
							&&
						</button>
						<TagCheckbox
							v-model="ACC_STORE.SEARCH_TAG"
							v-for="tag in TagChecked"
							:tag="tag"
							class="ring ring-light" />
						<TagCheckbox
							v-model="ACC_STORE.SEARCH_TAG"
							v-for="tag in TagList"
							:tag="tag"
							class="py-2" />
					</div>
				</div>
			</SlideT>
		</div>

		<!-- Operator -->
		<div class="flex max-h-[40vh] w-full flex-col gap-3 mb-3">
			<!-- Search -->
			<div class="flex h-10 w-full gap-1">
				<input
					v-model="ACC_STORE.SEARCH_KEYWORD"
					type="text"
					name="search"
					placeholder="Search Acc..."
					class="w-full appearance-none light-mode px-3 py-1 placeholder-bismark-950/50 hover:bg-apricot-100" />

				<!-- Clear Button -->
				<button
					@click="ACC_STORE.ResetSearch"
					class="light-mode flex justify-center w-14 items-center p-1 active:dark-mode transition-all">
					<IClose class="h-7 w-7" />
				</button>

				<!-- Show Operator -->
				<button
					@click="showOperator = !showOperator"
					class="light-mode flex justify-center items-center p-1 w-14 transition-all active:dark-mode">
					<ICaretRight
						:class="ChangeCaret(!showOperator)"
						class="h-7 w-7 transition-all duration-500" />
				</button>
			</div>

			<!-- List Operator -->
			<SlideT direction="left">
				<div v-if="showOperator" class="flex w-full flex-col gap-1 overflow-hidden">
					<div class="flex w-full gap-1">
						<button
							v-for="i in 6"
							@click="SetFilterStar(i)"
							:class="ActiveFilterStar(i)"
							class="text-bismark-950 w-full flex py-1 justify-center transition-all">
							<IStar class="h-5 w-5" />
							{{ i }}
						</button>
						<button
							@click="SetIsLimited()"
							:class="ActiveLimited()"
							class="w-full flex py-1 justify-center transition-all" >
							<IStar class="h-5 w-5 limited-bg" />
						</button>
					</div>

					<div
						class="flex w-full h-full flex-wrap justify-center gap-1 overflow-y-auto overflow-x-hidden rounded bg-bismark-950">
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
			</SlideT>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"
import { RarityToStyle } from "@/assets/js/utils"

import SlideT from "@transitions/SlideT.vue"
import OperatorCheckbox from "./OperatorCheckbox.vue"
import TagCheckbox from "@/components/tag/TagCheckbox.vue"


// Stores
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const showOperator = ref(false)
const showSort = ref(false)
const showTag = ref(false)
const filterStar = ref(0)
const searchOperator = ref("")
const searchLimited = ref(false)

// Getters
const TagList = computed(() => TAG_STORE.FILTERED.filter((tag) => !ACC_STORE.SEARCH_TAG.includes(tag.id)))
const TagChecked = computed(() => TAG_STORE.ListIdToObj(ACC_STORE.SEARCH_TAG))
const OperatorChecked = computed(() => OPERATOR_STORE.ListIdToObj(ACC_STORE.SEARCH_OPERATOR))
const OperatorList = computed(() => {
	const search = searchOperator.value.toLowerCase()
	const keyword = ACC_STORE.SEARCH_KEYWORD.toLowerCase()
	const searchedOperators = OPERATOR_STORE.FILTERED.filter((op) =>
		!ACC_STORE.SEARCH_OPERATOR.includes(op.id) &&
		(filterStar.value === 0 || op.rarity === filterStar.value) &&
		op.name.toLowerCase().includes(search) &&
		op.name.toLowerCase().includes(keyword) &&
		(!searchLimited.value || op.limited)
	)

	return searchedOperators
})
const SixLengthPossible = computed(() => {
	return [...new Set(ACC_STORE.DATA.map((acc) => acc.six_op_length))].sort((a, b) => b - a)
})


// Actions
const ChangeCaret = (value) => (value ? "rotate-180" : "rotate-0")
const ActiveSort = (value) => value ? "bg-light text-bismark-950" : "border"
const ActiveTag = (value) => value ? "light-mode" : "border"
const ActiveSixLength = (length) => ACC_STORE.SEARCH_SIX_LENGTH === length ? "bg-light text-bismark-950" : "border"
const ActiveFilterStar = (value) => filterStar.value === value ? "bg-light" : RarityToStyle(value)
const ActiveLimited = () => searchLimited.value ? "bg-light text-bismark-950" : "bg-rare-six"
const SetFilterStar = (star) => (filterStar.value = filterStar.value === star ? 0 : star)
const SetIsLimited = () => searchLimited.value = !searchLimited.value
</script>
