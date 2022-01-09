<template>
	<div>
		<label for="contribute">Contribute to this campaign (ETH)</label>
		<input class="rounded w-full mb-6 mt-1" type="number" id="contribute" v-model="contribution" />

		<Message v-if="errorMsg">
			<template v-slot:title>Error!</template>
			{{ errorMsg }}
		</Message>

		<app-button @click="contribute" :disabled="waiting">
			<span v-if="!waiting">Contribute!</span>
			<span v-else>Contributing...</span>
		</app-button>
	</div>
</template>

<script>
import web3 from '@/ethereum/web3';

export default {
	name: 'ContributeForm',
	props: {
		contributeMethod: { type: Function, required: true },
		minimumContribution: { type: String | Number },
	},
	data() {
		return {
			contribution: 0,
			waiting: false,
			errorMsg: '',
		};
	},
	methods: {
		async contribute() {
			if (this.waiting) return;

			try {
				this.errorMsg = '';
				this.waiting = true;
				const c = web3.utils.toWei(this.contribution.toString(), 'ether');
				if (parseInt(c) < parseInt(this.minimumContribution)) {
					this.errorMsg = `Minimum appount of Wei is ${this.minimumContribution}! Please add more...`;
					return;
				}

				const accounts = await web3.eth.getAccounts();
				await this.contributeMethod().send({
					from: accounts[0],
					value: c,
				});
				this.$nuxt.refresh();
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
