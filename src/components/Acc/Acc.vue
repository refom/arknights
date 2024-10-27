<template>
	<div class="flex flex-col items-center w-full p-3 gap-3">
		<div v-if="IsLoading" class="w-full bg-rare-five">
			Loading. . .
		</div>

		<div v-if="Error" class="w-full bg-red-300">
			{{ Error }}
		</div>

		<AccCard v-if="AccData" v-for="acc in AccData" :acc="acc" />
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
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
const IsLoading = ref(false);
const Error = ref(null)

// Getters
const AccData = computed(() => ACC_STORE.SortLatest)

// Actions
const Fetch = async () => {
	IsLoading.value = true

	try {
		await OPERATOR_STORE.Fetch()
		await TAG_STORE.Fetch()
		await ACC_STORE.Fetch();
	} catch (error) {
		Error.value = error
	}

	IsLoading.value = false
}

watch(() => ROUTE.params, Fetch, { immediate: true })


</script>
