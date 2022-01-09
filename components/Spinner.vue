<template functional>
	<svg class="spinner" viewBox="0 0 22 22">
		<circle class="path" cx="11" cy="11" r="8" fill="none" :stroke="props.color" stroke-width="3"></circle>
	</svg>
</template>

<script>
export default {
	name: 'Spinner',
	props: {
		color: { type: String, default: 'white' },
	},
};
</script>

<style scoped>
.spinner {
	animation: rotate 2s linear infinite;
	z-index: 2;
	/* position: absolute;
	top: 50%;
	left: 50%;
	margin: -10px 0 0 -10px; */
	width: 22px;
	height: 22px;
}

.path {
	/* stroke: hsl(210, 70, 75); */
	stroke-linecap: round;
	animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>
