<script setup>
	import EnterWebTitle from '@/components/EnterWebTitle.vue';
	import Nav from '@/components/Nav.vue';
	import IntroductionProduct from '@/components/IntroductionProduct.vue';
</script>

<template>
	<div class="main">
		<Nav />
		<EnterWebTitle />
		<IntroductionProduct />
		<footer></footer>
	</div>
</template>

<style scoped>

	footer {
		width: 100vw;
		height: 30px;
		background-color: rgb(84, 68, 43);
	}
</style>