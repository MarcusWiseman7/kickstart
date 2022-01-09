<template>
	<div>
		<h1 class="font-semibold text-2xl">Campaign Requests</h1>
		<div v-if="!loading">
			<div class="w-1/4 ml-auto">
				<app-button @click="$router.push(`/campaigns/${address}/requests/new`)">Add Request</app-button>
			</div>

			<table class="w-full mt-4 table-fixed border-collapse border border-blue-300 border-4">
				<thead>
					<tr>
						<th v-for="(t, i) in headers" :key="i" class="border border-blue-300 border-2" :class="t.class">
							{{ t.text }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, i) in requests" :key="i">
						<td v-for="(cell, i) in row" :key="i" class="text-center py-1 border border-blue-300 border-2 break-words">
							{{ cell }}
						</td>
						<td class="text-center py-1 border border-blue-300 border-2">
							<app-button dClass="!bg-green-500 !active:bg-green-700 !hover:bg-green-600">Approve</app-button>
						</td>
						<td class="text-center py-1 border border-blue-300 border-2">
							<app-button dClass="!bg-red-500 !active:bg-red-700 !hover:bg-red-600">Finalize</app-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="w-full h-20 flex items-center justify-center" v-else>
			<Spinner color="blue" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'CampaignRequests',
	data() {
		return {
			waiting: false,
			loading: true,
			errorMsg: '',
			headers: [
				{ text: 'ID', class: 'w-1/12' },
				{ text: 'Description', class: 'w-1/4' },
				{ text: 'Amount' },
				{ text: 'Recipient' },
				{ text: 'Approval Count' },
				{ text: 'Approve' },
				{ text: 'Finalize' },
			],
			requests: [
				{
					id: 1,
					description: 'Buy batteries',
					amount: 1,
					recipient: '0xsdfjdsfkjds',
					approvalCount: '120/300',
				},
			],
		};
	},
	computed: {
		...mapState(['activeCampaign']),
		address() {
			return this.$route.params.address;
		},
	},
	async created() {
		if (!this.activeCampaign) await this.$store.dispatch('getCampaign', this.address);
		this.loading = false;
	},
};
</script>

<style lang="scss" scoped></style>
