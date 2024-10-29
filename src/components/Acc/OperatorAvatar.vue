<template>
	<div
		:class="RarityToStyle(operator.rarity)"
		class="flex flex-col aspect-square rounded bg-clip-border items-center max-h-18 hover:max-h-full">
		<img
			:src="OpIdToImg(operator.id)"
			:alt="operator.name"
			class="wh-full object-cover" />
		
		<p class="text-center text-wrap text-xs font-medium text-primary w-full overflow-hidden">
			{{ operator.name }}
		</p>
	</div>
</template>

<script setup>
import { inject } from 'vue';

const { RarityToStyle, OpIdToImg } = inject("utils")

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
