<template>
	<div
		class="bg-gray-50 shadow-md border rounded p-4 cursor-pointer hover:shadow-lg"
		@click="$router.push('/campaigns/' + address)"
	>
		<div class="text-lg">{{ address }}</div>
		<div class="text-blue-500">View Campaign</div>
	</div>
</template>

<script>
export default {
	name: 'CampaignCard',
	props: {
		header: { type: String, default: '' },
		address: { type: String, required: true },
	},
};
</script>

<style scoped></style>
