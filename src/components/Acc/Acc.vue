<template>
	<div class="flex flex-col items-center w-full p-3 gap-3" ref="listEl">
		<div v-if="isLoading" class="wh-full flex flex-col items-center justify-center">
			<IRefresh class="w-1/2 h-1/2 animate-spin" />
			<span class="animate-pulse">
				Getting Data...
			</span>
		</div>

		<div v-if="errorMessage" class="wh-full flex flex-wrap bg-red-300">
			{{ errorMessage }}
		</div>

		<AccCard v-if="AccData" v-for="acc in AccData" :acc="acc" />
	</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAccStore } from '@/stores/acc';
import { useOperatorStore } from '@/stores/operator';
import { useTagStore } from '@/stores/tag';

import AccCard from './AccCard.vue';

// Stores
const ROUTE = useRoute();
const ACC_STORE = useAccStore();
const OPERATOR_STORE = useOperatorStore();
const TAG_STORE = useTagStore();

// Variables
const listEl = ref(null)
const currentLimit = ref(0)
const limit = 5

const isLoading = ref(false);
const errorMessage = ref(null)

const AccData = computed(() => {
	ACC_STORE.Filter()
	return ACC_STORE.DATA_FILTERED.slice(0, currentLimit.value)
})

// Actions
const Fetch = async () => {
	isLoading.value = true

	try {
		await OPERATOR_STORE.Fetch()
		await TAG_STORE.Fetch()
		await ACC_STORE.Fetch()
		currentLimit.value += limit
	} catch (error) {
		errorMessage.value = error
	}

	isLoading.value = false
}

const ScrollHandler = (e) => {
	if (listEl.value.getBoundingClientRect().bottom < window.innerHeight) {
		if (currentLimit.value < ACC_STORE.DATA_FILTERED.length) {
			currentLimit.value += limit
		}
	}
}

watch(() => ROUTE.params, Fetch, { immediate: true })

// Lifecycle
onMounted(() => {
	window.addEventListener('scroll', ScrollHandler)
})

onUnmounted(() => {
	window.removeEventListener('scroll', ScrollHandler)
})


</script>
