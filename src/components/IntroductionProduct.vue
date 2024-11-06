<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import nutsData from '@/utils/nut.js';

    const products = ref([]);  // 存儲每個產品元素的 refs
    let observer;

    const handleIntersect = (entries) => {
        entries.forEach(entry => {
            entry.isIntersecting ?
                // 當元素進入視窗時觸發
                entry.target.classList.add('visible') :
                // 當元素離開視窗時觸發
                entry.target.classList.remove('visible');
        })
    }

    onMounted(() => {
        // 創建 IntersectionObserver 實例
        observer = new IntersectionObserver(handleIntersect, {
            threshold: 0.1 // 元素至少有 10% 在視窗中時觸發
        });

        // 將每個產品元素添加到觀察器中
        products.value.map(product => observer.observe(product));
    });

    onBeforeUnmount(() => {
        // 清理觀察器
        if (observer) {
            products.value.map(product => observer.unobserve(product));
            observer.disconnect();
        }
    });
</script>

<template>
    <div class="container">
        <div class="wrapper" v-for="(nuts, index) in nutsData" :key="index" ref="products">
            <div class="intro-text">
                <h2>{{ nuts.name }}</h2>
                <p>{{ nuts.introduction.long }}</p>
            </div>
            <img class="intro-img" :src="nuts.img" :alt="nuts.name + '圖片'">
        </div>
    </div>
</template>

<style scoped>

/* 加入過渡效果 */

    .container {
        width: 60%;
        margin: auto;
    }

    .wrapper {
        margin: 60px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 160px;
        opacity: 0.1;
        transition: 1s ease;
    }

    .wrapper:nth-child(odd) {
        transform: translateX(-10px);
    }

    .wrapper:nth-child(even) {
        flex-direction: row-reverse;
        transform: translateX(10px);
    }
    
    .wrapper.visible {
        transform: translateX(0px);
        opacity: 1;
    }
    
    .divider {
        width: 1px;
        background: linear-gradient(transparent 10%, black 10%, black 90%, transparent 90%);
        margin: 0px;
    }

    .wrapper:nth-child(odd) .intro-img {
        width: 160px;
        padding-left: 30px;
        margin-left: 50px;
        border-left: 1px solid black;
        object-fit: cover;
    }
    
    .wrapper:nth-child(even) .intro-img {
        width: 160px;
        padding-right: 30px;
        margin-right: 50px;
        border-right: 1px solid black;
        object-fit: cover;
    }

</style>