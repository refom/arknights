<template>
	<label
		:class="RarityToStyle(operator.rarity)"
		class="flex flex-col aspect-square rounded bg-clip-border items-center max-h-20 hover:max-h-full">
		<input
			:id="operator.id"
			type="checkbox"
			v-model="OPERATOR_STORE.SEARCH_OPERATOR"
			:value="operator.id"
			class="hidden" />

		<img
			:src="OpIdToImg(operator.id)"
			:alt="operator.name"
			class="wh-full object-cover" />
		
		<p class="text-center text-wrap text-xs font-medium text-primary w-full overflow-hidden">
			{{ operator.name }}
		</p>
	</label>
</template>

<script setup>
import { inject } from 'vue';
import { useOperatorStore } from '@/stores/operator';

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
		}
	},
})
</script>
