<template>
	<div
		:class="$rarityToStyle(5)"
		class="flex flex-col aspect-square rounded bg-clip-border max-w-full items-center">
		<img
			:src="$opIdToImg(PROPS.operator)"
			alt="amiya"
			class="wh-full object-cover" />
		
		<p class="text-center text-xs font-medium text-primary w-full leading-none">
			Amiya
		</p>
	</div>
</template>

<script setup>
// Props
const PROPS = defineProps({
	operator: {
		type: String,
		default: "amiya",
	},
})
</script>
