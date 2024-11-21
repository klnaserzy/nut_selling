<script setup>
    import { computed, ref, watch } from 'vue';
    import nutsData from '@/utils/nut.js'

    const props = defineProps({
        cart: Object,
        totalPrice: Number,
        localNutsDataFilter: Array
    })
    const emit = defineEmits(['update:localNutsDataFilter', 'showPurchaseModal'])

    const flavored = ref(false);
    const other = ref(false);
    const localNutsData = ref(nutsData);
    const localNutsDataFilter = computed(() => {
        if(flavored.value !== other.value) {
            const filterData = (checkedValue) => localNutsData.value.filter(nuts => checkedValue === nuts.cate)
            return flavored.value ? filterData('風味腰果') : filterData('其他')
        }
        return localNutsData.value;
    });
    const handleQuantityInput = (e, cartList) => {
        const quantity = e.target.value;

        if(quantity > 0) {
            props.cart.map(product => {
                if(product.name === cartList.name)
                    product.quantity = quantity;
            })
        }
        else {
            props.cart.map(product => {
                if(product.name === cartList.name)
                    product.quantity = 0;
            })
        }
    }
    const handleClickPurchase = () => emit('showPurchaseModal', true);

    watch(() => localNutsDataFilter.value, () => {
        emit('update:localNutsDataFilter', localNutsDataFilter.value)
    })

</script>

<template>
    <div class="product-sidebar">
        <div class="category-nav">
            <ul>
            <li>
                <input v-model='flavored' id="flavored cashew nuts" type="checkbox" name="cate"/>
                <label for="flavored cashew nuts"> 風味腰果 [10]</label>
            </li>
            <li>
                <input v-model='other' id="other" type="checkbox" name="cate"/>
                <label for="other"> 其他 [2]</label>
            </li>
            </ul>
        </div>
        <hr />
        <div class="cart-preview">
            <div class="cart">
                <ul>
                    <li v-for="(cartList, index) in cart" :key="index">
                        <p>{{ cartList.name }}</p>
                        <div class="purchase-quantity">
                            <button @click="cartList.quantity > 0 ? --cartList.quantity : null">-</button>
                            <input @input="(e) => handleQuantityInput(e, cartList)" type="number" :value='cartList.quantity'/>
                            <button @click="++cartList.quantity">+</button>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />
            <div class="total-price">
                <p>總金額: {{ props.totalPrice }}元</p>
            </div>
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