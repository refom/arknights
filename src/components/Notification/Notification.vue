<template>
	<div class="fixed bottom-5 flex w-full flex-col xl:left-0 xl:w-1/3 z-20">
		<SlideUpT duration="100">
			<NotifItem
				v-for="notif in NOTIF_STORE.GetNotif"
				:key="notif.id"
				:item="notif" />
		</SlideUpT>
	</div>
</template>

<script setup>
import { useNotifStore } from "@/stores/notification"
import NotifItem from "./NotifItem.vue"
import SlideUpT from "@transitions/SlideUpT.vue"

const NOTIF_STORE = useNotifStore()
</script>
