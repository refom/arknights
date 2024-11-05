<template>
	<div
		:class="RarityToStyle(operator.rarity)"
		class="relative max-h-18 flex aspect-square max-w-14 flex-col items-center bg-clip-border hover:max-h-full md:max-h-20 md:max-w-16 lg:max-h-24 lg:max-w-20 active:bg-apricot-100 active:text-bismark-950 active:max-h-full hover:bg-apricot-100">
		<img
			:src="OpIdToImg(operator.id)"
			:alt="operator.name"
			class="max-h-20" />

		<IStar 
			v-if="operator.limited"
			class="absolute top-0 right-0 h-5 w-5 limited-bg" />

		<p class="w-full overflow-hidden text-wrap text-center text-xs font-medium text-bismark-950">
			{{ operator.name }}
		</p>
	</div>
</template>

<script setup>
import { RarityToStyle, OpIdToImg } from "@/assets/js/utils"

const PROPS = defineProps({
	operator: {
		type: Object,
		default() {
			return {
				id: "amiya",
				name: "Amiya",
				rarity: 5,
				limited: false,
			}
		},
	},
})
</script>
