<template>
	<div
		class="sticky top-0 h-16 bg-gray-50 shadow border rounded mt-4 mb-8 flex justify-between items-center divide-x-2 divide-gray-100"
	>
		<div class="text-2xl ml-4 cursor-pointer" @click="$router.push('/')">CrowdCoin</div>
		<div class="flex h-full divide-x-2 divide-gray-100">
			<flat-grey-button @click="$router.push('/')">Campains</flat-grey-button>
			<flat-grey-button @click="$router.push('/campaigns/new')">
				<span class="text-xl font-bold leading-none p-0">&plus;</span>
			</flat-grey-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CHeader',
};
</script>

<style lang="scss" scoped></style>
