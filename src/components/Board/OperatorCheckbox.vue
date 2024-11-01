<template>
	<label
		:class="RarityToStyle(operator.rarity)"
		class="max-h-18 flex aspect-square max-w-14 flex-col items-center rounded bg-clip-border hover:max-h-full md:max-h-20 md:max-w-16 lg:max-h-24 lg:max-w-20">
		<input
			:id="operator.id"
			type="checkbox"
			v-model="OPERATOR_STORE.SEARCH_OPERATOR"
			:value="operator.id"
			class="hidden" />

		<img
			:src="OpIdToImg(operator.id)"
			:alt="operator.name"
			class="max-h-20 object-cover" />

		<p
			class="w-full overflow-hidden text-wrap text-center text-xs font-medium text-bismark-950">
			{{ operator.name }}
		</p>
	</label>
</template>

<script setup>
import { inject } from "vue"
import { useOperatorStore } from "@/stores/operator"

const { RarityToStyle, OpIdToImg } = inject("utils")

const OPERATOR_STORE = useOperatorStore()
const PROPS = defineProps({
	operator: {
		type: Object,
		default() {
			return {
				id: "amiya",
				name: "Amiya",
				rarity: 5,
			}
		},
	},
})
</script>
