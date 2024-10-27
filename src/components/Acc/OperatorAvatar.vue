<template>
	<div
		:class="$rarityToStyle(operator.rarity)"
		class="flex flex-col aspect-square rounded bg-clip-border max-w-full items-center group">
		<img
			:src="$opIdToImg(operator.id)"
			:alt="operator.name"
			class="wh-full object-cover" />
		
		<p class="text-center text-wrap text-xs font-medium text-primary w-full max-h-4 group-hover:max-h-full">
			{{ operator.name }}
		</p>
	</div>
</template>

<script setup>
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
