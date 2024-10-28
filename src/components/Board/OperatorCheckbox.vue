<template>
	<label
		:class="$rarityToStyle(operator.rarity)"
		class="flex flex-col aspect-square rounded bg-clip-border max-w-full items-center group">
		<input
			:id="operator.id"
			type="checkbox"
			v-model="OPERATOR_STORE.SEARCH_OPERATOR"
			:value="operator.id"
			class="hidden" />

		<img
			:src="$opIdToImg(operator.id)"
			:alt="operator.name"
			class="wh-full object-cover" />
		
		<p class="text-center text-wrap text-xs font-medium text-primary w-full max-h-4 group-hover:max-h-full">
			{{ operator.name }}
		</p>
	</label>
</template>

<script setup>
import { useOperatorStore } from '@/stores/operator';
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
		}
	},
})
</script>
