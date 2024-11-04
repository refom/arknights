<template>
	<TransitionGroup
		:enter-active-class="EnterActive"
		:enter-from-class="EnterFrom"
		:enter-to-class="LeaveFrom"
		:leave-active-class="LeaveActive"
		:leave-from-class="LeaveFrom"
		:leave-to-class="EnterFrom">
		<slot></slot>
	</TransitionGroup>
</template>

<script setup>
import { computed } from "vue"
const PROPS = defineProps({
	duration: {
		type: Number,
		default: 300,
	},
	direction: {
		type: String,
		default: "up",
	},
	opacity: {
		type: Boolean,
		default: false,
	}
})

const Duration = computed(() => {
	switch (PROPS.duration) {
		case 100:
			return "duration-100"
		case 300:
			return "duration-300"
		case 500:
			return "duration-500"
		case 700:
			return "duration-700"
		case 1000:
			return "duration-1000"
		default:
			return "duration-300"
	}
})

const OpacityIn = computed(() => PROPS.opacity ? "opacity-0" : "")
const OpacityOut = computed(() => PROPS.opacity ? "opacity-100" : "")

const EnterFrom = computed(() => {
	if (PROPS.direction === "up") return `translate-y-full ${OpacityIn.value}`
	if (PROPS.direction === "down") return `-translate-y-full ${OpacityIn.value}`
	if (PROPS.direction === "left") return `translate-x-full ${OpacityIn.value}`
	if (PROPS.direction === "right") return `-translate-x-full ${OpacityIn.value}`
})

const LeaveFrom = computed(() => {
	if (PROPS.direction === "up" || PROPS.direction === "down") return `translate-y-0 ${OpacityOut.value}`
	if (PROPS.direction === "left" || PROPS.direction === "right") return `translate-x-0 ${OpacityOut.value}`
})

const EnterActive = computed(() => `transition-all ease-out ${Duration}`)
const LeaveActive = computed(() => `transition-all ease-in ${Duration}`)

</script>
