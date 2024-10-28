<template>
	<div class="flex w-full flex-col gap-1 rounded bg-bismark-950 px-3 py-1">
		<!-- Header -->
		<div class="flex h-10 w-full items-center justify-between">
			<!-- ID -->
			<div class="flex h-full items-center gap-3">
				<span
					@click="CopyAcc"
					class="flex h-full items-center font-oxanium text-lg font-medium">
					#{{ acc.id.toUpperCase() }}
				</span>

				<span
					v-if="IsNew"
					class="flex animate-pulse items-center rounded bg-rare-five pl-1 pr-2 font-oxanium text-sm font-medium text-primary">
					<IStar class="h-4 w-4" />
					NEW
				</span>
			</div>

			<!-- Button -->
			<div class="flex h-full w-1/4 items-center gap-3 p-1">
				<!-- Copy ID -->
				<button
					@click="CopyAcc"
					class="light-mode wh-full cursor-pointer select-none rounded transition-all active:bg-light/50">
					<ICopy class="wh-full" />
				</button>

				<!-- Show All Operator -->
				<button
					@click="showOperator = !showOperator"
					class="light-mode wh-full cursor-pointer select-none rounded transition-all active:bg-light/50">
					<ICaretDown
						:class="ChangeCaret"
						class="wh-full transition-all duration-500" />
				</button>
			</div>
		</div>

		<!-- Operator -->
		<div
			@click="showOperator = !showOperator"
			:class="CollapseOperator"
			class="flex w-full flex-wrap items-start gap-2 overflow-hidden transition-all">
			<OperatorAvatar
				class="w-14"
				v-for="op in Operators"
				:operator="op" />
		</div>

		<!-- Details -->
		<div class="my-1 flex w-full flex-wrap items-center gap-2">
			<span
				class="flex items-center rounded light-mode pr-2 font-oxanium font-medium">
				<ICaretRight class="h-5 w-5" />
				{{ acc.story.toUpperCase() }}
			</span>

			<div
				v-for="tag in Tags"
				:class="$rarityToStyle(tag.rarity)"
				class="flex items-center rounded px-1 font-oxanium font-medium text-primary">
				<ITag class="h-5 w-5" />
				{{ tag.name }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useNotifStore } from "@/stores/notification"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

// Components
import OperatorAvatar from "./OperatorAvatar.vue"

// Props
const PROPS = defineProps({
	acc: {
		type: Object,
		default() {
			return {
				id: "ARKNAI0001",
				operator: ["amiya", "kaltsit"],
				tag: ["Starter"],
				story: "0-3",
				created_at: "2020-01-01 00:00:00",
				updated_at: "2020-01-01 00:00:00",
			}
		},
	},
})

// Stores
const NOTIF_STORE = useNotifStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const showOperator = ref(false)

// Getters
const Operators = computed(() =>
	OPERATOR_STORE.SortByRarity(PROPS.acc.operator),
)
const Tags = computed(() => TAG_STORE.GetTags(PROPS.acc.tag))
const IsNew = computed(() => {
	const today = new Date()
	const createdAt = new Date(PROPS.acc.created_at)
	return today - createdAt <= 3 * 24 * 60 * 60 * 1000
})

const ChangeCaret = computed(() =>
	showOperator.value ? "rotate-180" : "rotate-0",
)
const CollapseOperator = computed(() =>
	showOperator.value ? "max-h-full" : "max-h-[4.5rem]",
)

// Actions
const CopyAcc = () => {
	const sixStarOp = Operators.value
		.filter((op) => op.rarity === 6)
		.map((op) => op.name)
	const tagsName = Tags.value.map((tag) => tag.name).join(", ")
	navigator.clipboard
		.writeText(`#${PROPS.acc.id}\nOperator: ${sixStarOp}\nTag: ${tagsName}`)
		.catch(console.error)

	NOTIF_STORE.Add(`Copy #${PROPS.acc.id}`, "ok")
}
</script>
