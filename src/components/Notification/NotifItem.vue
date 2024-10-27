<template>
	<div class="px-5 py-1">
		<button
			v-if="isActive"
			@click="CloseNotif"
			:class="StatusBg"
			class="w-full rounded-lg p-3 text-lg">
			<div class="flex items-center px-3 py-2 font-semibold">
				<span>
					{{ item.message }}
				</span>
			</div>
		</button>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useNotifStore } from "@/stores/notification"

// Props
const PROPS = defineProps({
	item: {
		type: Object,
		default() {
			return {
				id: 0,
				status: null,
				message: "Test Notification",
				duration: 3000,
			}
		},
	},
})

// Variable
const NOTIF_STORE = useNotifStore()
const isActive = ref(true)
let timer = null

// Lifecycle
onMounted(() => {
	// Set timer to close
	timer = setTimeout(CloseNotif, PROPS.item.duration)
})

// Actions
const CloseNotif = () => {
	if (timer) clearTimeout(timer)

	// Close Notification
	setTimeout(() => {
		NOTIF_STORE.Remove(PROPS.item.id)
		isActive.value = false
	}, 300)
}

// Dynamic Class
const StatusBg = computed(() => {
	switch (PROPS.item.status) {
		case "ok":
			return "bg-green-500 lg:hover:bg-green-600 active:bg-green-600 text-primary"
		case "bad":
			return "bg-red-500 lg:hover:bg-red-600 active:bg-red-600 text-light"
		default:
			return "bg-bismark-800 lg:hover:bg-bismark-900 active:bg-bismark-900 text-light"
	}
})
</script>
