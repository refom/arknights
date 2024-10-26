<template>
	<div
		class="bg-gradient-to-tr from-dark-lg to-dark-md font-poppins text-light">
		<RouterView />
		<Notification />
	</div>
</template>

<script setup>
import Notification from "@/components/Notification/Notification.vue"
</script>
