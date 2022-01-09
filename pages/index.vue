<template>
	<div class="grid gap-4 grid-cols-4">
		<div class="col-span-3 grid gap-4">
			<campaign-card v-for="(c, i) in campaigns" :key="i" :address="c"></campaign-card>
		</div>
		<div class="">
			<app-button @click="$router.push('/campaigns/new')"
				><span class="text-xl font-bold leading-none p-0">&plus;</span> Create Campaign</app-button
			>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['campaigns']),
	},
};
</script>
