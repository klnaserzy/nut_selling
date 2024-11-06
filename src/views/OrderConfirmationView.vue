<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import Nav from '@/components/Nav.vue';

    const route = useRoute();
    const cart = ref([])

    onMounted(() => {
        if(route.query.cart)
            cart.value = JSON.parse(route.query.cart)

    })

</script>

<template>
    <Nav></Nav>
</template>

<style scoped>

</style>