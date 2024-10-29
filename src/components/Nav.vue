<script setup>
    import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="nav-bar">
        <div class="home-nav-link">
            <RouterLink class="nav-link" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208l24.9 0L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320L80 320 5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5L192 448l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 168.5 0c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320l33.4 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208l24.9 0c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/></svg>
                <p>Natural</p>
            </RouterLink>
        </div>
        <div class="other-nav-links">
            <RouterLink class="nav-link" to="/sell">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

    svg {
        width: 25px;
        height: 25px;
    }

    .nav-bar {
        background-color: transparent;
        position: sticky;
        top: 0px;
        height: 70px;
        background-color: #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
    }

    .home-nav-link {        
        margin-left: 30px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-link {
        height: 100%;
        width: 100%;
        font-size: 1.8em;
        text-decoration: none;
        color: #0fb800;
        font-weight: 600;
        display: flex;
        gap: 5px;
    }

    .nav-link:active {
        color: green;
    }

    .nav-link svg {
        margin: auto;
    }

    .other-nav-links {
        margin-right: 30px;
    }

    

    @media (max-width: 1024px) {
        .nav-link {
            color: black;
            border: 1px solid #b1ff6488;
        }
    }

    @media (max-width: 340px) {
        .nav-link {
            font-size: 1.2rem; 
        }
    }
</style>