<template>
	<div class="wh-full flex flex-col gap-3 px-3 pt-5">
		<!-- Buy -->
		<div class="flex w-full flex-col">
			<button
				@click="showHow = !showHow"
				class="light-mode w-full rounded p-1 transition-all active:opacity-50">
				How it works
			</button>

			<SlideUpT direction="right">
				<div
					v-if="showHow"
					class="flex h-full w-full flex-col gap-3 rounded bg-bismark-950 p-3">
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5" />
						<div class="w-full">
							Check out the account you're into
							<IHeart class="inline h-5 w-5" />
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						<div class="w-full">
							Tap the
							<ICaretDown class="light-mode inline h-7 w-7 rounded" />
							or
							<OperatorAvatar class="inline-flex align-middle h-7 w-7" :operator="dummyOperator" />
							to show more Operator.
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						<div class="w-full">
							Tap the
							<ICopy class="light-mode inline h-7 w-7 rounded" />
							or
							<span class="font-oxanium text-lg font-medium">
								#ACC_ID
							</span>
							to copy the Account information.
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						<div class="w-full">
							Contact me via
							<a :href="Discord.url">
								<img :src="Discord.icon" :alt="Discord.name" class="h-7 w-7 rounded inline">
							</a>
							or
							<a :href="Itemku.url">
								<img :src="Itemku.icon" :alt="Itemku.name" class="h-7 w-7 rounded inline">
							</a>
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						Wait for my response for further details.
					</div>
				</div>
			</SlideUpT>
		</div>

		<!-- Acc Information -->
		<div class="flex w-full flex-col overflow-hidden">
			<button
				@click="showAcc = !showAcc"
				class="light-mode w-full rounded p-1 transition-all active:opacity-50">
				Example Account Information
			</button>

			<SlideUpT direction="right">
				<AccCard v-if="showAcc" :acc="dummyAcc" />
			</SlideUpT>
		</div>
	</div>
</template>

<script setup>
import { ref, inject } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"

// Components
import SlideUpT from "@transitions/SlideUpT.vue"
import AccCard from "@/components/Acc/AccCard.vue"
import OperatorAvatar from "@/components/Acc/OperatorAvatar.vue"

// Variables
const showAcc = ref(false)
const showHow = ref(false)

const { dummyAcc, dummyOperator } = inject("utils")
</script>
