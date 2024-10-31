<script setup>



</script>

<template>
    <div class="hero-section">
        <div class="grid">
            <img class="product animation-delay1 fade-in" src="@/assets/images/peanut-coffee-peanut-glutinous-rice-peanuts-53591.jpeg">
            <img class="product animation-delay2 fade-in" src="@/assets/images/pexels-photo-114121.jpeg">
            <img class="product animation-delay3 fade-in" src="@/assets/images/pexels-photo-372842.jpeg">
            <img class="product animation-delay1 fade-in" src="@/assets/images/pexels-photo-1295572.jpeg">
            <img class="product animation-delay2 fade-in" src="@/assets/images/pexels-photo-2161650.jpeg">
            <div id="intro" class="fade-in">
                <h1>自然健康的美味，源自每一顆堅果</h1>
                <p>每一顆都是自然的結晶，為健康生活加分，甄選天然來源，給每一口健康保障，精心挑選，呈現您值得信賴的堅果好味道。</p>
            </div>
            <img class="product animation-delay3 fade-in" src="@/assets/images/pexels-photo-3969097.webp">
            <img class="product animation-delay1 fade-in" src="@/assets/images/pexels-photo-4110186.jpeg">
            <img class="product animation-delay2 fade-in" src="@/assets/images/pexels-photo-7262748.webp">
            <img class="product animation-delay3 fade-in" src="@/assets/images/pexels-photo-7262769.webp">
            <img class="product animation-delay1 fade-in" src="@/assets/images/pexels-photo-7717478.jpeg">
        </div>
    </div>
</template>

<style scoped>

    .hero-section {
        display: flex;
    }

    .grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2vw;
    }

    .product {
        width: 100%;
        height: 35vh;
        object-fit:cover;
    }

    .animation-delay1 {
        animation-delay: 0s;
    }
    
    .animation-delay2 {
        animation-delay: 0.3s;
    }
    
    .animation-delay3 {
        animation-delay: 0.6s;
    }

    #intro {
        height: 100%;
        grid-column-start: 2;
        grid-column-end: 4;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 垂直置中 */
        align-items: center; /* 水平置中 */
        text-align: center;
        gap: 20px;
        animation-delay: 0.5s;
    }

</style>