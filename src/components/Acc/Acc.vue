<template>
	<div class="flex flex-col items-center w-full p-3 gap-3">
		<AccCard v-for="i in 10" />
	</div>
</template>

<script setup>
import AccCard from './AccCard.vue';
</script>
