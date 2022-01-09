<template>
	<div>
		<h1 class="font-semibold text-2xl mb-6">Campain Details</h1>
		<div class="grid grid-cols-3 gap-2" v-if="!loading">
			<div class="col-span-2 mr-10">
				<div class="grid grid-cols-2 gap-4">
					<info-box v-for="(b, i) in boxes" :key="i" :title="b.title" :description="b.description"></info-box>
				</div>
				<div class="w-1/3 mt-6">
					<app-button @click="$router.push(`/campaigns/${address}/requests`)">View Requests</app-button>
				</div>
			</div>
			<contribute-form
				:minimumContribution="summary.minimumContribution"
				:contributeMethod="activeCampaign.methods.contribute"
			></contribute-form>
		</div>
		<div class="w-full h-20 flex items-center justify-center" v-else>
			<Spinner color="blue" />
		</div>
	</div>
</template>

<script>
import web3 from '@/ethereum/web3';
import { mapState } from 'vuex';

export default {
	name: 'Campaign',
	data() {
		return {
			summary: {},
			contribute: 100,
			loading: true,
		};
	},
	computed: {
		...mapState(['activeCampaign']),
		address() {
			return this.$route.params.address;
		},
		boxes() {
			return [
				// { title: 'Manager', description: this.summary.manager },
				// { title: web3.utils.fromWei(this.summary.balance, 'ether') + ' ETH', description: 'Campaign Balance' },
				// { title: this.summary.minimumContribution + ' Wei', description: 'Minimum Contribution' },
				// { title: this.summary.requestsCount, description: 'Pending Requests' },
				// { title: this.summary.approversCount, description: 'Contributors' },
			];
		},
	},
	async created() {
		// this.address = this.$route.params.address;
		// this.campaign = await getCampaign(this.address);
		await this.$store.dispatch('getCampaign', this.address);
		// const summary = await this.activeCampaign.methods.getSummary().call();
		// this.summary = {
		// 	minimumContribution: summary[0],
		// 	balance: summary[1],
		// 	requestsCount: summary[2],
		// 	approversCount: summary[3],
		// 	manager: summary[4],
		// };
		// this.loading = false;
	},
};
</script>

<style lang="scss" scoped></style>
