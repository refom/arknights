<template>
	<div class="fixed bottom-20 z-50 flex w-full flex-col gap-3 px-5 py-1">
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
