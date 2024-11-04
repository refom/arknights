<template>
	<div
		class="fixed bottom-0 z-10 flex w-full flex-col items-center overflow-hidden rounded-t xl:hidden">
		<!-- Board Content -->
		<SlideT :duration="300">
			<div
				v-if="IsOpen"
				class="w-full flex flex-col max-h-[70vh] overflow-y-auto">
				<div class="flex w-full bg-bismark-950">
					<!-- Info Board -->
					<SlideT direction="right" :opacity="true">
						<InfoBoard v-if="CurrentTab === 1" />
					</SlideT>
	
					<!-- Filter Acc -->
					<SlideT direction="left" :opacity="true">
						<FilterBoard v-if="CurrentTab === 2" />
					</SlideT>
				</div>

				<!-- Tab Inside -->
				<div
					class="sticky bottom-0 flex h-12 flex-shrink-0 justify-around border-b bg-bismark-950">
					<button
						@click="ChangeTab(1)"
						class="flex h-full w-full items-center justify-center active:bg-apricot-100/10">
						<IInfo class="h-7 w-7" />
					</button>
					<button
						@click="ChangeTab(2)"
						class="flex h-full w-full items-center justify-center active:bg-apricot-100/10">
						<IFilter class="h-7 w-7" />
					</button>
				</div>
			</div>
		</SlideT>

		<!-- Tab Outside -->
		<div class="sticky bottom-0 flex h-16 w-full items-center justify-around bg-bismark-950">
			<!-- Logo -->
			<div
				class="flex h-full w-full items-center justify-center transition active:bg-apricot-100/10">
				<img src="/icon.png" alt="icon" class="h-10 rounded-full" />
			</div>

			<!-- Menu -->
			<button
				@click="IsOpen = !IsOpen"
				class="flex h-full w-full items-center justify-center active:bg-apricot-100/10">
				<ICaretUp :class="ChangeCaret" class="h-10 transition-all" />
			</button>

			<!-- Social Link -->
			<div class="flex h-full w-full items-center justify-center gap-3">
				<a :href="Itemku.url" target="_blank">
					<img :src="Itemku.icon" :alt="Itemku.name" class="h-10" />
				</a>

				<a :href="Discord.url" target="_blank">
					<img :src="Discord.icon" :alt="Discord.name" class="h-10" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"

// Components
import SlideT from "@transitions/SlideT.vue"
import InfoBoard from "./InfoBoard.vue"
import FilterBoard from "./FilterBoard.vue"

// Variables
const IsOpen = ref(false)
const CurrentTab = ref(parseInt(localStorage.getItem("CurrentTab")) || 1)

// Getters
const ChangeCaret = computed(() => (IsOpen.value ? "rotate-180" : ""))

// Actions
const ChangeTab = (value) => {
	CurrentTab.value = value
	localStorage.setItem("CurrentTab", value)
}
</script>
