<template>
	<div class="flex w-full flex-col gap-1 px-3 py-5">
		<!-- Buy -->
		<div class="flex w-full flex-col">
			<button
				@click="showHow = !showHow"
				class="light-mode active:dark-mode w-full p-1">
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
						<IInfoCircle class="mt-1 h-5 w-5" />
						<div class="w-full">
							Tap the Operator
							<OperatorAvatar
								class="inline-flex h-7 w-7 align-middle"
								:operator="dumOp" />
							to show more Operator.
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="mt-1 h-5 w-5" />
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
						<IInfoCircle class="mt-1 h-5 w-5" />
						<div class="w-full">
							Contact me via
							<a :href="Discord.url" target="_blank">
								<img
									:src="Discord.icon"
									:alt="Discord.name"
									class="inline h-7 w-7 rounded" />
							</a>
							or
							<a :href="Itemku.url" target="_blank">
								<img
									:src="Itemku.icon"
									:alt="Itemku.name"
									class="inline h-7 w-7 rounded" />
							</a>
						</div>
					</div>
					<div class="flex w-full gap-2">
						<IInfoCircle class="mt-1 h-5 w-5" />
						Wait for my response for further details.
					</div>
				</div>
			</SlideT>
		</div>

		<!-- Legend -->
		<div class="flex w-full flex-col">
			<button
				@click="showLegend = !showLegend"
				class="light-mode active:dark-mode w-full p-1">
				Legend
			</button>

			<SlideT direction="right">
				<table v-if="showLegend" class="mt-1 table table-auto">
					<tbody>
						<!-- Limited -->
						<tr>
							<td class="place-items-center">
								<IStar class="limited-bg h-5 w-6" />
							</td>
							<td class="px-3 py-1">Limited Operator</td>
						</tr>
						<!-- New -->
						<tr>
							<td class="place-items-center">
								<div
									class="flex h-5 w-max animate-pulse items-center rounded bg-rare-five pl-1 pr-2 font-oxanium text-xs font-medium text-bismark-950">
									<IStar class="h-4 w-4" />
									NEW
								</div>
							</td>
							<td class="px-3 py-1">Newly added Account</td>
						</tr>
						<!-- Sort Date -->
						<tr>
							<td class="place-items-center">
								<div class="flex">
									<ICalendar class="h-7 w-7" />
									<ICaretUp class="h-7 w-7" />
								</div>
							</td>
							<td class="px-3 py-1">Sort by date added</td>
						</tr>
						<!-- Sort how many 6 stars -->
						<tr>
							<td class="place-items-center">
								<div class="flex">
									<IStar class="h-7 w-7 text-rare-six" />
									<ICaretUp class="h-7 w-7" />
								</div>
							</td>
							<td class="px-3 py-1">Sort by how many 6 stars</td>
						</tr>
						<!-- Filter six star amount -->
						<tr>
							<td>
								<div class="flex flex-col">
									<div
										class="flex justify-center gap-1 border px-1">
										1
										<IStar class="h-5 w-5 text-rare-six" />
									</div>
									<div
										class="flex justify-center gap-1 border px-1">
										2
										<IStar class="h-5 w-5 text-rare-six" />
									</div>
								</div>
							</td>
							<td class="px-3 py-1">
								Filter accounts by how many 6 stars they have
							</td>
						</tr>
						<!-- Filter only tag -->
						<tr>
							<td class="place-items-center">
								<div class="flex border px-1">&&</div>
							</td>
							<td class="px-3 py-1">
								Filter accounts by ONLY selected tags
							</td>
						</tr>
					</tbody>
				</table>
			</SlideT>
		</div>

		<!-- Acc Information -->
		<div class="flex w-full flex-col">
			<button
				@click="showAcc = !showAcc"
				class="light-mode active:dark-mode w-full p-1">
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
const showLegend = ref(false)

const dumOp = computed(() => {
	const temp = dummyOperator
	temp.limited = false
	return temp
})
</script>
