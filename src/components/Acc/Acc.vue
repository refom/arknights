<template>
	<div class="flex flex-col w-full h-full items-center p-3 xl:w-2/3" ref="listEl">
		<div
			v-if="isLoading"
			class="h-full w-full flex flex-col items-center justify-center">
			<IRefresh class="h-1/3 w-1/3 animate-spin" />
			<span class="animate-pulse"> Loading Data... </span>
		</div>

		<div
			v-if="errorMessage"
			class="w-full h-full flex flex-wrap justify-center bg-red-300 p-3">
			{{ errorMessage }}
		</div>

		<div
			v-if="AccData"
			class="w-full h-full flex flex-col items-center gap-3 md:w-3/4 xl:w-2/3">
			<AccCard v-for="acc in AccData" :acc="acc" :key="acc.id" />
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useAccStore } from "@/stores/acc"
import { useOperatorStore } from "@/stores/operator"
import { useTagStore } from "@/stores/tag"

import AccCard from "./AccCard.vue"

// Stores
const ROUTE = useRoute()
const ACC_STORE = useAccStore()
const OPERATOR_STORE = useOperatorStore()
const TAG_STORE = useTagStore()

// Variables
const listEl = ref(null)
const currentLimit = ref(0)
const limit = 10

const isLoading = ref(false)
const errorMessage = ref(null)

const AccData = computed(() => ACC_STORE.FILTERED.slice(0, currentLimit.value))

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
	if (listEl.value.getBoundingClientRect().bottom <= window.innerHeight) {
		if (currentLimit.value < ACC_STORE.FILTERED.length) {
			currentLimit.value += limit
		}
	}
}

watch(() => ROUTE.params, Fetch, { immediate: true })

// Lifecycle
onMounted(() => {
	window.addEventListener("scroll", ScrollHandler)
})

onUnmounted(() => {
	window.removeEventListener("scroll", ScrollHandler)
})
</script>
