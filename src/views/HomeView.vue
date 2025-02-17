<script setup>
	import EnterWebTitle from '@/components/EnterWebTitle.vue';
	import Nav from '@/components/Nav.vue';
	import IntroductionProduct from '@/components/IntroductionProduct.vue';
	import Footer from '@/components/Footer.vue';
</script>

<template>
	<div class="main">
		<Nav />
		<EnterWebTitle />
		<IntroductionProduct />
		<footer>
			<Footer></Footer>
		</footer>
	</div>
</template>

<style scoped>

	footer {
		width: 100%;
		height: 30px;
		background-color: rgb(84, 68, 43);
	}
</style>