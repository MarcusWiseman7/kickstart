<template>
	<div class="border rounded border-pink-900 my-4 p-4 text-pink-700 bg-pink-100 w-full">
		<h1 class="font-bold text-xl"><slot name="title"></slot></h1>
		<p class="font-semibold"><slot></slot></p>
	</div>
</template>

<script>
export default {
	name: 'Message',
};
</script>

<style lang="scss" scoped></style>
