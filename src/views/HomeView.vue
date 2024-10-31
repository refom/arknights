<template>
	<div class="flex flex-col min-h-screen xl:flex-row">
		<Sidebar v-if="!MOBILE_STORE.IsMobile" />
		<Acc />
	</div>
	<Board v-if="MOBILE_STORE.IsMobile" />
</template>

<script setup>
import { useMobileStore } from '@/stores/mobile';

// Components
import Acc from '@/components/Acc/Acc.vue';
import Board from '@/components/Board/Board.vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

const MOBILE_STORE = useMobileStore();
</script>
