<template>
	<div class="flex w-full flex-col gap-1 rounded bg-bismark-950 px-3 py-1">
		<!-- Header -->
		<div class="flex h-10 w-full items-center justify-between">
			<!-- ID -->
			<div
				@click="CopyAcc"
				class="flex h-full items-center">
				<span class="font-oxanium text-lg font-medium">
					#{{ acc.id }}
				</span>
			</div>

			<!-- Button -->
			<div class="flex h-full w-1/4 items-center gap-3 p-1">
				<!-- Copy ID -->
				<button
					@click="CopyAcc"
					class="light-mode wh-full cursor-pointer select-none rounded active:bg-light/50 transition-all">
					<Copy class="wh-full" />
				</button>

				<!-- Show All Operator -->
				<button
					@click="showOperator = !showOperator"
					class="light-mode wh-full cursor-pointer select-none rounded active:bg-light/50 transition-all">
					<CaretDown
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
			<OperatorAvatar class="w-14" v-for="op in Operators" :operator="op" />
		</div>

		<!-- Details -->
		<div class="my-1 flex w-full flex-wrap items-center gap-2">
			<span
				class="rounded bg-light px-1 font-oxanium font-medium text-primary">
				{{ acc.story }}
			</span>

			<span
				v-for="tag in Tags"
				:class="$rarityToStyle(tag.rarity)"
				class="rounded px-1 font-oxanium font-medium text-primary">
				{{ tag.name }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useNotifStore } from "@/stores/notification"
import { useOperatorStore } from "@/stores/operator";
import { useTagStore } from "@/stores/tag";

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
const Operators = computed(() => OPERATOR_STORE.SortByRarity(PROPS.acc.operator))
const Tags = computed(() => TAG_STORE.GetTags(PROPS.acc.tag))
const ChangeCaret = computed(() =>
	showOperator.value ? "rotate-180" : "rotate-0"
)
const CollapseOperator = computed(() =>
	showOperator.value ? "max-h-full" : "max-h-[4.5rem]"
)

// Actions
const CopyAcc = () => {
	const sixStarOp = Operators.value.filter((op) => op.rarity === 6).map((op) => op.name)
	const tagsName = Tags.value.map((tag) => tag.name).join(", ")
	navigator.clipboard
		.writeText(
			`#${PROPS.acc.id}\nOperator: ${sixStarOp}\nTag: ${tagsName}`
		)
		.catch(console.error)

	NOTIF_STORE.Add(`Copy #${PROPS.acc.id}`, "ok")
}
</script>
