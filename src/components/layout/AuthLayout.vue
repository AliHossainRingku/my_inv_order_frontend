<template>
	<div class="i-auth">
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'AuthLayout'
	}
</script>

<style lang="scss">
	.i-auth{
		height: 100vh;
	}
</style>