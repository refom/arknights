<template>
	<div class="flex overflow-hidden rounded bg-bismark-950">
		<!-- Card -->
		<div class="flex w-full select-none flex-col gap-1 p-1">
			<!-- Header -->
			<div class="flex h-max w-full items-center justify-between">
				<!-- ID -->
				<div class="flex items-center gap-3">
					<button
						@click="CopyAcc"
						class="hover:light-mode flex w-max px-1 font-oxanium text-lg font-medium active:bg-apricot-100 active:text-bismark-950">
						#{{ acc.id.toUpperCase() }}
					</button>

					<span
						v-if="IsNew"
						class="flex h-5 animate-pulse items-center rounded bg-rare-five pl-1 pr-2 font-oxanium text-xs font-medium text-bismark-950">
						<IStar class="h-4 w-4" />
						NEW
					</span>
				</div>
			</div>

			<!-- Operator -->
			<div
				@click="showOperator = !showOperator"
				:class="CollapseOperator"
				class="flex w-full flex-wrap gap-1 overflow-hidden">
				<OperatorAvatar
					v-for="op in Operators"
					:operator="op" />
			</div>

			<!-- Details -->
			<div
				class="flex flex-wrap gap-1 py-1 font-oxanium font-semibold text-bismark-950">
				<span class="flex items-center bg-light pr-2">
					<ICaretRight class="h-5 w-5" />
					{{ acc.story.toUpperCase() }}
				</span>

				<div
					v-for="tag in Tags"
					:class="RarityToStyle(tag.rarity)"
					class="flex items-center px-1">
					<ITag class="h-5 w-5" />
					{{ tag.name }}
				</div>
			</div>
		</div>

		<!-- Action Button -->
		<div class="flex max-w-14 flex-col overflow-hidden">
			<!-- Copy ID -->
			<button
				@click="CopyAcc"
				class="hover:light-mode active:dark-mode px-1 flex h-full w-full items-center justify-center">
				<ICopy class="h-10 w-10" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useNotifStore } from "@/stores/notification"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"
import { RarityToStyle } from "@/assets/js/utils"

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
const Operators = computed(() => OPERATOR_STORE.ListIdToObj(PROPS.acc.operator))
const Tags = computed(() => TAG_STORE.ListIdToObj(PROPS.acc.tag))
const CollapseOperator = computed(() => showOperator.value ? "max-h-full" : "max-h-18 md:max-h-20 lg:max-h-24")
const IsNew = computed(() => {
	const today = new Date()
	const createdAt = new Date(PROPS.acc.created_at)
	return today - createdAt <= 3 * 24 * 60 * 60 * 1000
})


// Actions
const CopyAcc = () => {
	const sixStarOp = Operators.value
		.filter((op) => op.rarity === 6 || op.limited)
		.map((op) => op.name).join(", ")
	const tagsName = Tags.value.map((tag) => tag.name).join(", ")
	navigator.clipboard
		.writeText(`#${PROPS.acc.id}\nOperator: ${sixStarOp}\nTag: ${tagsName}`)
		.catch(console.error)

	NOTIF_STORE.Add(`Copy #${PROPS.acc.id}`, "ok")
}
</script>
