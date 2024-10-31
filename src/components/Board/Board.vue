<template>
	<div
		class="sticky bottom-0 z-10 order-last flex max-h-[70vh] w-full flex-col overflow-hidden rounded-t
		xl:hidden">
		<!-- Board -->
		<SlideUpT duration="300">
			<div
				v-if="IsOpen"
				class="flex w-full flex-col overflow-y-auto bg-bismark-900">
				<!-- Board Content -->
				<div class="wh-full flex">
					<!-- Info Board -->
					<SlideUpT direction="right" :opacity="true">
						<InfoBoard v-if="CurrentTab === 0" />
					</SlideUpT>

					<!-- Filter Acc -->
					<SlideUpT direction="left" :opacity="true">
						<FilterBoard v-if="CurrentTab === 1" />
					</SlideUpT>
				</div>

				<!-- Tab -->
				<div
					class="sticky bottom-0 flex h-12 w-full items-center justify-around border-b bg-bismark-900">
					<button
						@click="CurrentTab = 0"
						class="wh-full py-1 active:bg-bismark-950">
						<IInfo class="h-2/3 w-full" />
					</button>
					<button
						@click="CurrentTab = 1"
						class="wh-full py-1 active:bg-bismark-950">
						<IFilter class="h-2/3 w-full" />
					</button>
				</div>
			</div>
		</SlideUpT>

		<!-- Tab -->
		<div
			class="sticky bottom-0 flex order-last h-16 w-full items-center justify-around bg-bismark-900">
			<!-- Logo -->
			<div
				class="flex aspect-square h-full w-full justify-center items-center py-3 transition-all active:bg-bismark-950">
				<img src="/icon.png" alt="icon" class="rounded-full h-full" />
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
			<div class="flex h-full w-full justify-center py-3
				xl:max-h-24 xl:gap-10">
				<a :href="Itemku.url" target="_blank" class="flex w-full justify-center
					xl:w-auto">
					<img :src="Itemku.icon" :alt="Itemku.name" class="h-full" />
				</a>

				<a :href="Discord.url" target="_blank" class="flex w-full justify-center
					xl:w-auto">
					<img :src="Discord.icon" :alt="Discord.name" class="h-full" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"

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
