import { defineStore } from "pinia"
import { computed, ref } from "vue";

const CreateGUID = () => {
    return String(
        Date.now().toString(32) + Math.random().toString(16)
    ).replace(/\./g, "")
}

const useNotifStore = defineStore("notification", () => {
	// States
	const NOTIFS = ref([])

	// Getters
	const GetNotif = computed(() => NOTIFS.value)

	// Actions
	function Reset() {
		NOTIFS.value = []
	}

	function Add(message, status = null, duration = 3000) {
		NOTIFS.value.push({
			id: CreateGUID(),
			status,
			message,
			duration,
		})
	}

	function Remove(id) {
		NOTIFS.value = NOTIFS.value.filter((notif) => notif.id !== id)
	}

	return { GetNotif, Reset, Add, Remove }
})

export { useNotifStore }
