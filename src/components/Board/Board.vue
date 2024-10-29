<template>
	<div
		class="sticky bottom-0 flex max-h-[70vh] w-full flex-col overflow-hidden rounded-t">
		<!-- Board -->
		<SlideUpT duration="300">
			<div
				v-if="IsOpen"
				class="flex h-screen w-full flex-col bg-bismark-900 overflow-y-auto">
				<!-- Info Board -->
				<InfoBoard v-if="CurrentTab === 0" />

				<!-- Filter Acc -->
				<FilterBoard v-else-if="CurrentTab === 1" />

				<!-- Tab -->
				<div
					class="sticky bottom-0 flex h-12 w-full items-center justify-around border-b">
					<button
						@click="CurrentTab = 0"
						class="wh-full bg-bismark-900 py-1 active:bg-bismark-950">
						<IInfo class="w-full h-2/3" />
					</button>
					<button
						@click="CurrentTab = 1"
						class="wh-full bg-bismark-900 py-1 active:bg-bismark-950">
						<IFilter class="w-full h-2/3" />
					</button>
				</div>
			</div>
		</SlideUpT>

		<!-- Tab -->
		<div
			class="sticky bottom-0 flex h-16 w-full items-center justify-around bg-bismark-900">
			<!-- Logo -->
			<div
				class="flex h-full w-full justify-center py-3 transition-all active:bg-bismark-950">
				<img src="/icon.png" alt="icon" class="rounded-full" />
			</div>

			<!-- Menu -->
			<button
				@click="IsOpen = !IsOpen"
				class="flex h-full w-full items-center justify-center transition-all active:bg-bismark-950">
				<ICaretUp
					:class="ChangeCaret"
					class="h-2/3 transition-all duration-500" />
			</button>

			<!-- Social Link -->
			<div class="flex h-full w-full justify-center py-3">
				<a href="#" class="flex w-full justify-center">
					<img src="/itemku.png" alt="itemku" class="h-full" />
				</a>

				<a href="#" class="flex w-full justify-center">
					<img src="/discord.png" alt="discord" class="h-full" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from "vue"

// Components
import SlideUpT from "@transitions/SlideUpT.vue"
import InfoBoard from "./InfoBoard.vue"
import FilterBoard from "./FilterBoard.vue"

// Variables
const IsOpen = ref(false)
const CurrentTab = ref(0)

// Getters
const ChangeCaret = computed(() => (IsOpen.value ? "rotate-180" : ""))
</script>
