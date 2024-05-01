<script setup>
    import { RouterLink } from 'vue-router';
    import { onMounted } from 'vue';

    
    onMounted(() => {
        const imgHeight = 400 + (30 * window.innerWidth * 0.01 * 0.5) - 30;
        const scrollItem = document.querySelector(".nav-bar a");

        if(window.innerWidth > 1024){

            scrollItem.addEventListener('mouseover', () => {
                scrollItem.style.color = 'black';
            });

            window.addEventListener("scroll", () => {
                if(window.scrollY > imgHeight){
                    scrollItem.style.color = "black";

                    scrollItem.addEventListener('mouseout', () => {
                        if(window.scrollY < imgHeight){
                            scrollItem.style.color = '#b1ff64';
                        }
                    });
                } else {
                    scrollItem.style.color = "#b1ff64";
                }
            });

        }
    });

</script>

<template>
    <div class="nav-bar">
        <div class="home-nav-link">
            <RouterLink to="/">natural</RouterLink>
        </div>
        <div class="other-nav-links">
        </div>
    </div>
</template>

<style scoped>
    .nav-bar {
        background-color: transparent;
        position: fixed;
        top: 10px;
        width: 100vw;
        height: 50px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .home-nav-link {        
        margin-left: 20px;
        overflow: hidden;
        position: relative;
        border-radius: 100px;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-bar a {
        padding: 0 20px;
        height: 100%;
        width: 100%;
        font-size: 1.5rem;
        text-decoration: none;
        color: #b1ff64;
        border: 1px solid #b1ff64;
        border-radius: 100px;
        line-height: 1.8em;
        background-color: transparent;
        font-weight: 600;

        transition: .2s ease-in-out;
        transition: color .5s ease-in-out;
    }

    .nav-bar a::before {
        content: "";
        width: 100%;
        height: 100%;
        left: -100%;
        background-color: #b1ff64;
        position: absolute;
        z-index: -1;
        transition: transform .5s ease-in-out
    }

    .nav-bar a:hover::before {
        transform: translateX(100%);
    }

    .nav-bar a:active {
        color: green;
    }
</style>