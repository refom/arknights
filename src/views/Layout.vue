<template>
	<div
		class="bg-gradient-to-tr from-dark-lg to-dark-md font-poppins text-light">
		<RouterView />
		<Notification />
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useMobileStore } from "@/stores/mobile"
import Notification from "@/components/Notification/Notification.vue"

const MOBILE_STORE = useMobileStore()
onMounted(() => {
	window.addEventListener("resize", MOBILE_STORE.UpdateWidth)
})

onUnmounted(() => {
	window.removeEventListener("resize", MOBILE_STORE.UpdateWidth)
})
</script>
