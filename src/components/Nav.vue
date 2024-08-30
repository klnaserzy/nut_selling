<script setup>
    import { RouterLink } from 'vue-router';
    import { onMounted, ref, watch, onBeforeUnmount } from 'vue';

    const imgHeight = 550;

    window.addEventListener('scroll', () => {
    });

    const fontColorBlack = (event) => {
        event.target.style.color = "black";
    }
    
    const fontColorGreen = (event) => {
        if(window.innerWidth < 1024) return;
        if(window.scrollY > imgHeight) return;
        event.target.style.color = "#b1ff64";
    }

</script>

<template>
    <div class="nav-bar">
        <div class="home-nav-link">
            <RouterLink class="nav-link" @mouseover="fontColorBlack" @mouseout="fontColorGreen" to="/sell">Natural</RouterLink>
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

        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
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

    .nav-link {
        padding: 0 20px;
        height: 100%;
        width: 100%;
        font-size: 1.5rem;
        text-decoration: none;
        color: #b1ff64;
        border: 1px solid #b1ff64;
        border-radius: 9999px;
        line-height: 1.8em;
        background-color: transparent;
        font-weight: 600;

        transition: .2s ease-in-out;
        transition: color .5s ease-in-out;
    }

    
    .nav-link:hover {
        color: black;
    }

    .nav-link::before {
        content: "";
        width: 100%;
        height: 100%;
        left: -100%;
        background-color: #b1ff64;
        position: absolute;
        z-index: -1;
        transition: transform .5s ease-in-out
    }

    .nav-link:hover::before {
        transform: translateX(100%);
    }

    .nav-link:active {
        color: green;
    }

    .toSell {
        
    }

    @media (max-width: 1024px) {
        .nav-link {
            color: black;
            border: 1px solid #b1ff6488;
        }

        .nav-link::before {
            width: 200%;
        }

        .nav-link:hover::before {
            transform: translateX(0);
        }
    }

    @media (max-width: 340px) {
        .nav-link {
            font-size: 1.2rem; 
        }
    }
</style>