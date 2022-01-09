<template functional>
	<button
		class="rounded text-white bg-blue-500 font-semibold w-full h-10 flex justify-center items-center active:bg-blue-700 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-wait"
		:class="props.dClass"
		v-on="listeners"
		:disabled="props.disabled"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		disabled: { type: Boolean, default: false },
		dClass: { type: String, default: '' },
	},
};
</script>

<style lang="scss" scoped></style>
