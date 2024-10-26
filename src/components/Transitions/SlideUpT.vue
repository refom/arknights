<template>
	<Transition
		:enter-active-class="Duration"
		:leave-active-class="Duration"
		enter-active-class="transition-all ease-out"
		enter-from-class="translate-y-full"
		enter-to-class="translate-y-0"
		leave-active-class="transition-all ease-in"
		leave-from-class="translate-y-0"
		leave-to-class="translate-y-full">
		<slot></slot>
	</Transition>
</template>

<script setup>
import { computed } from "vue"
const PROPS = defineProps({
	duration: {
		type: String,
		default: 300,
	}
})

const Duration = computed(() => {
	switch (PROPS.duration) {
		case "100":
			return "duration-100"
		case "300":
			return "duration-300"
		case "500":
			return "duration-500"
		case "700":
			return "duration-700"
		case "1000":
			return "duration-1000"
		default:
			return "duration-300"
	}
})
</script>
