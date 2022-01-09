<template>
	<div>
		<div v-if="!loading">
			<app-button @click="addRequest" :disabled="waiting">
				<span>Add Request</span>
			</app-button>
		</div>
		<div class="w-full h-20 flex items-center justify-center" v-else>
			<Spinner color="blue" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NewCampaignRequest',
	data() {
		return {
			waiting: false,
			loading: true,
			errorMsg: '',
		};
	},
	computed: {
		...mapState(['activeCampaign']),
		address() {
			return this.$route.params.address;
		},
	},
	methods: {
		async addRequest() {
			if (this.waiting) return;

			try {
				this.waiting = true;
				this.errorMsg = '';
			} catch (err) {
				this.errorMsg = err.message;
			} finally {
				this.waiting = false;
			}
		},
	},
	created() {
		if (!this.activeCampaign) this.$store.dispatch('getCampaign', this.address);
		this.loading = false;
	},
};
</script>

<style lang="scss" scoped></style>
