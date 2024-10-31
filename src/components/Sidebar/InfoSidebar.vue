<template>
	<div class="flex max-h-max w-full flex-col gap-3">
		<div class="flex w-full flex-col gap-3 rounded-r bg-bismark-950 p-3">
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
					Tap the
					<ICaretDown class="light-mode inline h-7 w-7 rounded" />
					or
					<OperatorAvatar
						class="inline-flex h-7 w-7 align-middle"
						:operator="dummyOperator" />
					to show more Operator.
				</div>
			</div>
			<div class="flex w-full gap-2">
				<IInfoCircle class="mt-1 h-5 w-5" />
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

		<div class="flex w-full p-3">
			<AccCard :acc="dummyAcc" />
		</div>
	</div>
</template>

<script setup>
import { inject } from "vue"
import { Itemku, Discord } from "@/assets/js/social.js"

import AccCard from "@/components/Acc/AccCard.vue"
import OperatorAvatar from "@/components/Acc/OperatorAvatar.vue"

const { dummyAcc, dummyOperator } = inject("utils")
</script>
