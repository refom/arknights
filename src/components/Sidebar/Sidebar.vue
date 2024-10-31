<template>
	<div
		class="sticky top-0 flex max-h-screen w-1/3 flex-col items-center gap-3 overflow-hidden">
		<!-- Logo / Social -->
		<div class="flex max-h-24 w-full items-center justify-center gap-3 p-3">
			<img src="/icon.png" alt="icon" class="h-full rounded-full" />
			<span class="h-full font-oxanium text-4xl font-bold">
				REPOM <br />
				ARKNIGHTS
			</span>
			<div class="flex h-full items-center justify-center gap-5 p-3">
				<a :href="Itemku.url" target="_blank" class="aspect-square h-full hover:bg-bismark-950 transition-all hover:scale-110 rounded p-1">
					<img :src="Itemku.icon" :alt="Itemku.name" class="wh-full" />
				</a>
				<a :href="Discord.url" target="_blank" class="aspect-square h-full hover:bg-bismark-950 transition-all hover:scale-110 rounded p-1">
					<img :src="Discord.icon" :alt="Discord.name" class="wh-full" />
				</a>
			</div>
		</div>

		<!-- Tab -->
		<div
			class="flex h-14 max-w-full items-center justify-center overflow-hidden rounded">
			<button
				@click="ChangeTab(1)"
				:class="ActiveTab(1)"
				class="flex h-full items-center justify-center py-1 transition hover:bg-light hover:text-bismark-950">
				<IInfo class="h-full" />
			</button>
			<button
				@click="ChangeTab(2)"
				:class="ActiveTab(2)"
				class="flex h-full items-center justify-center py-1 transition hover:bg-light hover:text-bismark-950">
				<IFilter class="h-full" />
			</button>
		</div>

		<div class="wh-full flex max-h-[70vh] overflow-hidden">
			<SlideUpT direction="right">
				<InfoSidebar v-if="CurrentTab === 1" />

				<FilterSidebar v-if="CurrentTab === 2" />
			</SlideUpT>
		</div>

	</div>
</template>

<script setup>
import { ref } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"

import InfoSidebar from "./InfoSidebar.vue"
import FilterSidebar from "./FilterSidebar.vue";
import SlideUpT from "@transitions/SlideUpT.vue"

const CurrentTab = ref(0)

const ChangeTab = (value) => {
	CurrentTab.value = CurrentTab.value === value ? 0 : value
}

const ActiveTab = (value) => (value === CurrentTab.value ? "bg-light text-bismark-950" : "bg-bismark-950")
</script>
