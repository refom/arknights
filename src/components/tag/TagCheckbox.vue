<template>
	<label
		:class="RarityToStyle(tag.rarity)"
		class="flex p-1 text-bismark-950 items-center cursor-pointer select-none hover:bg-apricot-100 transition-all">
		<input
			type="checkbox"
			:value="tag.id"
			v-model="selectTag"
			class="hidden" />

		<span class="text-sm flex font-semibold tracking-wide">
			<ITag class="h-5 w-5" />
			{{ tag.name }}
		</span>
	</label>
</template>

<script setup>
import { RarityToStyle } from "@/assets/js/utils"

const PROPS = defineProps({
	tag: {
		type: Object,
		default() {
			return {
				id: "tag_id",
				name: "Tag Name",
				rarity: 1,
			}
		}
	},
})

const selectTag = defineModel()
</script>
