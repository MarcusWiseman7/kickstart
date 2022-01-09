<template>
	<div class="border border-2 rounded p-4">
		<h1 class="font-semibold text-l">{{ title }}</h1>
		<p class="break-words">{{ description }}</p>
	</div>
</template>

<script>
export default {
	name: 'InfoBox',
	props: {
		title: { type: String | Number, required: true },
		description: { type: String, required: true },
	},
};
</script>

<style lang="scss" scoped></style>
