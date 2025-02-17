<script setup>
    import { computed, ref, watch } from 'vue';
    import nutsData from '@/utils/nut.js'

    const props = defineProps({
        cart: Object,
        totalPrice: Number,
        localNutsDataFilter: Array
    })
    const emit = defineEmits(['update:localNutsDataFilter', 'showPurchaseModal'])

    const flavored = ref(false);  // 是否篩選風味腰果
    const other = ref(false);  // 是否篩選其他類別
    
    const localNutsData = ref(nutsData);  // 定義本地堅果數據


    // 計算屬性：根據篩選條件計算篩選後的堅果數據
    const localNutsDataFilter = computed(() => {
        if(flavored.value !== other.value) {
            // 根據篩選條件過濾數據
            const filterData = (checkedValue) => localNutsData.value.filter(nuts => checkedValue === nuts.cate)
            return flavored.value ? filterData('風味腰果') : filterData('其他')
        }
        return localNutsData.value;  // 如果未選中任何條件，返回所有數據
    });

    // 處理購物車數量輸入變化
    const handleQuantityInput = (e, cartList) => {
        const quantity = e.target.value;

        // 若數量大於 0，更新購物車項目的數量
        if(quantity > 0) {
            props.cart.map(product => {
                if(product.name === cartList.name)
                    product.quantity = quantity;
            })
        }
        else {  // 若數量小於或等於 0，將數量設為 0
            props.cart.map(product => {
                if(product.name === cartList.name)
                    product.quantity = 0;
            })
        }
    }

    // 處理購買按鈕的點擊事件
    const handleClickPurchase = () => emit('showPurchaseModal', true);

    // 監聽篩選數據的變化，並向父組件更新篩選後的數據
    watch(() => localNutsDataFilter.value, () => {
        emit('update:localNutsDataFilter', localNutsDataFilter.value)
    })

</script>

<template>
    <div class="product-sidebar">
        <!-- 分類篩選導航 -->
        <div class="category-nav">
            <ul>
            <li>
                <input v-model='flavored' id="flavored cashew nuts" type="checkbox" name="cate"/>
                <label for="flavored cashew nuts"> 風味腰果 [8]</label>
            </li>
            <li>
                <input v-model='other' id="other" type="checkbox" name="cate"/>
                <label for="other"> 其他 [3]</label>
            </li>
            </ul>
        </div>
        <hr />
        
        <!-- 購物車預覽 -->
        <div class="cart-preview">
            <div class="cart">
                <ul>
                    <!-- 遍歷購物車中的每個項目 -->
                    <p v-if="cart.length === 0">尚未加入任何項目</p>
                    <li v-for="(cartList, index) in cart" :key="index">
                        <p>{{ cartList.name }}</p>
                        <div class="purchase-quantity">
                            <!-- 減少數量按鈕，當數量大於 0 時才執行減少 -->
                            <button @click="cartList.quantity > 0 ? --cartList.quantity : null">-</button>
                            <!-- 輸入框，手動修改購買數量 -->
                            <input @input="(e) => handleQuantityInput(e, cartList)" type="number" :value="cartList.quantity" />
                            <!-- 增加數量按鈕 -->
                            <button @click="++cartList.quantity">+</button>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />
            <!-- 總金額與重量顯示 -->
            <div class="total-info">
                <p>總金額: {{ props.totalPrice }}元</p>
                <p>總重量: {{ props.totalPrice / 1000 }}kg</p>
            </div>
            <!-- 確認購買按鈕 -->
            <button @click="handleClickPurchase" id="purchase-button">確認購買</button>
        </div>
    </div>
</template>
  
<style scoped>
    .product-sidebar {
        position: sticky;
        top: 140px;
        width: 20%;
        height: 70vh;
        overflow: auto;
    }
    
    .cart li {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .cart li input[type='number']{
        width: 30px;
        height: 100%;
        text-align: center;
    }

    #purchase-button {
        display: block;
        width: 80%;
        margin: auto;
        border: none;
        background-color: #ca956f;
        color: white;
        height: 30px;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 1em;
    }

    #purchase-button:hover {
        background-color: #c58456;
    }

    hr {
        margin: 10px 0;
    }
    
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0; 
    }

    .cart li button{
        width: 15px;
        background-color: transparent;
        border: 1px solid hsl(0, 0%, 30%);
        height: 100%;
    }

</style>