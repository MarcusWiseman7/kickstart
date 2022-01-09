<template>
	<div class="flex flex-col">
		<h1 class="text-2xl font-semibold mb-12">New campaign</h1>
		<label class="ml-3" for="min">Minimum Contribution (wei)</label>
		<input class="rounded w-1/3" type="number" id="min" v-model="min" />
		<Message v-if="errorMsg">
			<template v-slot:title>Error!</template>
			{{ errorMsg }}
		</Message>
		<div class="mt-12 w-1/3">
			<app-button @click.prevent="create" :disabled="waiting">
				<span v-if="!waiting">Create</span>
				<span v-else>Creating...</span>
			</app-button>
		</div>
	</div>
</template>

<script>
import factory from '@/ethereum/factory';
import web3 from '@/ethereum/web3';

export default {
	name: 'NewCampaign',
	data() {
		return {
			min: 0,
			errorMsg: '',
			waiting: false,
		};
	},
	methods: {
		async create() {
			if (this.waiting) return;
			try {
				this.errorMsg = '';
				this.waiting = true;
				const accounts = await web3.eth.getAccounts();
				await factory.methods.createCampaign(this.min).send({
					from: accounts[0],
				});
				await this.$store.dispatch('getCampaigns');
				this.$router.push('/');
			} catch (err) {
				this.errorMsg = err.message;
			} finally {
				this.waiting = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
