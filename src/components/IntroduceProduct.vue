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
            <input id="inputSearch" v-model="searchInput" type="text" placeholder="堅果塔"/>
        </div>
        <RouterLink to="/sell" v-for="nut in searchNutData" :key="nut.id" class="product"  :style="{ backgroundColor: nut.color}">
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
    </div>
</template>

<style scoped>
    .container {
        width: 900px;
        margin: 30px auto;
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

        display: flex;
    }

    .product:hover {
        cursor: pointer;
    }

    .product:active {
        color:black;
    }

    .product img {
        margin-left: 20px;
        width: 200px;
        height: auto;
        border-radius: 20px;
        object-fit: cover;
    }

    .describe {
        margin-left: 60px;
        word-wrap: break-word;
    }

    .describe .name {
        font-weight: 400;
        font-size: 28px;
    }

    .describe p {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 18px;
    }

    .ingredients span {
        font-weight: 600;
    }

    #inputSearch {
        font-size: 16px;
        border-radius: 2rem;
        height: 28px;
        padding: 0 10px;
        border: 1px solid #ffffff;
        outline: 1px solid rgba(170, 50, 220, .6);
    }

    #inputSearch:focus {
        border: 1px solid #5053f8
    }

</style>