<script setup>
    import nutData from "@/data/nut.json"
    import { ref, computed } from "vue";
    import { RouterLink } from "vue-router";
    import nutImg from '@/assets/a_bag_of_handy_bag.jpg';

    const searchInput = ref("");

    const searchNutData = computed(() => {
        return nutData.filter(data => {
            let checkIncludes = false;
            return data.searchKey.some(searchKeyData => checkIncludes = searchKeyData.includes(searchInput.value.toLowerCase()))
            
        })
    });
</script>

<template>
    <div class="container">
        <div class="search">
            <label for="inputSearch">🔍搜尋: </label>
            <input id="inputSearch" v-model.trim="searchInput" type="text" placeholder="堅果塔"/>
        </div>
        <RouterLink to="/sell" v-if="searchNutData.length > 0" v-for="nut in searchNutData" :key="nut.id" class="product"  :style="{ backgroundColor: nut.color}">
            <img :src="nutImg" :alt="`${nut.name} product`">
            <div class="describe">
                <p class="name">{{ nut.name }}</p>
                <p class="origin">產地: {{ nut.origin }}</p>
                <p class="ingredients">成分: 
                    <span v-for="(ingredient, index) in nut.ingredient">
                        {{ ingredient }}
                        {{ index === nut.ingredient.length - 1 ? '' : '、' }}
                    </span>
                </p>
                <p class="weight">重量: {{ nut.weight }}</p>
                <p class="specifications">規格: {{ nut.specifications }}</p>
                <p class="allergy">過敏: {{ nut.allergy }}</p>
                <p class="expiryDate">有效期限: {{ nut.expiryDate }}</p>
            </div>
        </RouterLink>
        <div v-else class="searchFailed">好像沒有你要的東西喔(*´･д･)?</div>
    </div>
</template>

<style scoped>
    .container {
        width: 900px;
        margin: 30px auto;
        position: relative;
    }

    .search {
        text-align: right;
        margin: 0;
        padding: 0;
    }

    .product {
        margin: 60px 0;
        background-color: #b1ff6488;
        padding: 20px;
        border-radius: 50px;
        text-decoration: none;
        cursor: default;
        color: black;
        box-shadow: 0 0 5px 3px rgb(155, 155, 155);

        display: flex;

        transition:  .2s ease-in-out;
    }

    .product:hover {
        cursor: pointer;
        box-shadow: 7px 7px 12px 8px rgb(155, 155, 155);
        transform: translate(-7px, -7px);
    }

    .product:active {
        color:black;
    }

    .product img {
        margin-left: 20px;
        width: 200px;
        border-radius: 20px;
        object-fit: cover;
    }

    .describe {
        margin-left: 60px;
        word-wrap: break-word;
    }

    .describe .name {
        font-weight: 400;
        font-size: 1.8em;
    }

    .describe p {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 1.2em;
    }

    .ingredients span {
        font-weight: 600;
    }

    #inputSearch {
        font-size: 1.1em;
        border-radius: 2rem;
        height: 28px;
        padding: 0 10px;
        border: 1px solid #ffffff;
        outline: 1px solid rgba(170, 50, 220, .6);
    }

    #inputSearch:focus {
        border: 1px solid #5053f8
    }

    .searchFailed {
        height: 80vh;
    }

    @media (max-width: 1024px) {
        .container {
            width: 600px;
            font-size: 0.7em;
        }
        
        .product img {
            width: 160px;
        }
    }
    
    @media (max-width: 720px) {
        .container {
            width: 100vw;
        }

        .product {
            box-shadow: none;
            padding: 10px 20px;
            border-radius: 0px;
            margin: 0;
        }

        .product:nth-child(2) {
            margin-top: 10px;
        }

        .product:hover {
            transform: translate(0);
            box-shadow: none;
        }

        .container {
            margin-top: -40px;
        }

        .search {
            margin-right: 10px;
            color: white;
        }

        .searchFailed {
            margin: 40px 0 0 10px;
        }
    }
    
    @media (max-width: 400px) {
        .product {
            display: flex;
            flex-direction: column;
        }

        .product {
            img { 
                width: auto;
                margin: 0;
            }
            
            .describe {
                margin: 0;
            }
        }
    }
</style>