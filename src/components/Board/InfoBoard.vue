<template>
	<div class="w-full flex flex-col gap-1 px-3 py-5">
		<!-- Buy -->
		<div class="flex w-full flex-col">
			<button
				@click="showHow = !showHow"
				class="light-mode w-full p-1 active:dark-mode">
				How it works
			</button>

			<SlideT direction="right">
				<div
					v-if="showHow"
					class="flex h-full w-full flex-col gap-1 p-3">
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
							Tap the Operator
							<OperatorAvatar class="inline-flex align-middle h-7 w-7" :operator="dumOp" />
							to show more Operator.
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						<div class="w-full">
							Tap the copy button
							<ICopy class="inline h-7 w-7 rounded" />
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
							<a :href="Discord.url" target="_blank">
								<img :src="Discord.icon" :alt="Discord.name" class="h-7 w-7 rounded inline">
							</a>
							or
							<a :href="Itemku.url" target="_blank">
								<img :src="Itemku.icon" :alt="Itemku.name" class="h-7 w-7 rounded inline">
							</a>
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="h-5 w-5 mt-1" />
						Wait for my response for further details.
					</div>
				</div>
			</SlideT>
		</div>

		<!-- Acc Information -->
		<div class="flex w-full flex-col">
			<button
				@click="showAcc = !showAcc"
				class="light-mode w-full p-1 active:dark-mode">
				Example Account Information
			</button>

			<SlideT direction="right">
				<AccCard v-if="showAcc" :acc="dummyAcc" />
			</SlideT>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"
import { dummyAcc, dummyOperator } from "@/assets/js/utils.js"

// Components
import SlideT from "@transitions/SlideT.vue"
import AccCard from "@/components/Acc/AccCard.vue"
import OperatorAvatar from "@/components/Acc/OperatorAvatar.vue"

// Variables
const showAcc = ref(false)
const showHow = ref(false)

const dumOp = computed(() => {
	const temp = dummyOperator
	temp.limited = false
	return temp
})

</script>
