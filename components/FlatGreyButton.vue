<template functional>
	<button class="flex justify-center items-center px-6 hover:bg-gray-100 active:bg-gray-50" v-on="listeners">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'FlatGreyButton',
};
</script>

<style lang="scss" scoped></style>
