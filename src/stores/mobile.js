import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useMobileStore = defineStore("mobile", () => {
	// States
	const WIDTH = ref(screen.width)

	// Getters
	const IsMobile = computed(() => {
		if (WIDTH.value <= 1280) return true;
		return false;
	})

	// Actions
	const UpdateWidth = () => {
		if (screen.width === WIDTH.value) return;
		WIDTH.value = screen.width
	}

	return { IsMobile, UpdateWidth };
})

export { useMobileStore }