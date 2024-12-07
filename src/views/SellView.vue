<script setup>
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import Nav from '@/components/Nav.vue';
    import AutoCloseModal from '@/components/AutoCloseModal.vue';
    import Sidebar from '@/components/Sidebar.vue';

    import nutsData from '@/utils/nut.js'
    import nut1 from '@/assets/images/peanut-coffee-peanut-glutinous-rice-peanuts-53591.jpeg'
    import nut2 from '@/assets/images/pexels-photo-114121.jpeg'

    const router = useRouter();
    const cart = ref(
        [
            {
                name: '經典可可風味腰果',
                quantity: 2,
                price: 10,
                img: nut1
            },
            {
                name: '芥末風味腰果',
                quantity: 3,
                price: 20,
                img: nut2
            }
        ]
    )
    const modalToggle = ref(true);
    const purchaseModalToggle = ref(false);
    const purchaseModal = ref(null);
    const localNutsData = ref(nutsData);
    const closePurchaseModalButton = ref(null);
    const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.quantity * product.price, 0));
    const localNutsDataFilter = ref(localNutsData.value);
    
    const handleAddProduct = (addProduct) => {

        if(cart.value.some(product => product.name === addProduct.name)) {
            modalToggle.value = !modalToggle.value;
            return ;
        }

        cart.value.push({
            name: addProduct.name,
            quantity: 1,
            price: addProduct.price,
            img: addProduct.img
        })
    }
    
    const handleTogglePurchaseModal = (e, toggle) => {
        if(toggle){
            purchaseModalToggle.value = true;
        }
        else {
            if(e.target === purchaseModal.value || e.target === closePurchaseModalButton.value)
            purchaseModalToggle.value = false;
        }
    }

    const handleConfirmationPurchase = () => {
        router.push({
            name: 'OrderConfirmation',
            query: { cart: JSON.stringify(cart.value)}
        })
    }

</script>

<template>
	<div class="main-layout">
		<Nav />
        <AutoCloseModal :modalToggle="modalToggle">已加入到購物車</AutoCloseModal>
        <div @click="(e) => handleTogglePurchaseModal(e)" v-if="purchaseModalToggle" ref="purchaseModal" class="purchase-modal">
            <div class="purchase-wrapper">
                <div class="check-list">
                    <h2>購買清單</h2>
                    <div class="display-list">
                        <ul>
                            <li>
                                <p class="product-name">名稱</p>
                                <p class="product-quantity">數量</p>
                                <p class="product-per-price">每份</p>
                                <p class="product-total-price">金額</p>
                            </li>
                            <li v-for="(product, index) in cart" :key="index">
                                <p class="product-name">{{ product.name }}</p>
                                <p class="product-quantity">{{ product.quantity }}</p>
                                <p class="product-per-price">{{ product.price }}</p>
                                <p class="product-total-price">{{ product.price * product.quantity }}</p>
                            </li>
                        </ul>
                        <hr />
                        <p class="products-total-price">總金額: {{ totalPrice }}</p>
                        <div class="check-cancel-button">
                            <button @click="handleConfirmationPurchase" class="check">確認購買</button>
                            <button @click="(e) => handleTogglePurchaseModal(e)" ref="closePurchaseModalButton" class="cancel">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="products-section">
            <Sidebar 
                v-model:localNutsDataFilter="localNutsDataFilter" 
                :cart="cart" :totalPrice="totalPrice" 
                :purchaseModal="purchaseModal"
                @showPurchaseModal="(toggle) => handleTogglePurchaseModal(e, toggle)"
            ></Sidebar>
            <div class="product-list">
                <div class="product" v-for="(nut, index) in localNutsDataFilter" :key="index">
                    <img :src="nut.img" :alt="nut.name + '圖片'">
                    <div class="describe">
                        <h3>{{ nut.name }}</h3>
                        <p>{{ nut.introduction.short }}</p>
                        <button @click="() => handleAddProduct(nut)">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<style scoped>
    .main-layout {
        position: relative;
    }

    .cart-modal {
        width: 300px;  
        height: 80px;
        border-radius: 15px;
        position: fixed;
        margin: auto;
        top: 10px;
        left: calc(50% - 150px);
        background-color: #c58456;
        color: white;
        font-size: 1.2rem;
        z-index: 999;
    }

    .cart-modal-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .purchase-modal {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: hsla(0, 0%, 20%, 20%);
        z-index: 999;
    }
     
    .purchase-wrapper {
        width: 40%;
        margin: auto;
        background: linear-gradient(205deg, #fefcf6, #d7d1c7);
        border-radius: 15px;
        margin-top: 30px;
    }

    .check-list h2 {
        text-align: center;
        background-color: #ca956f;
        padding: 5px 0;
        color: white;
        border-radius: 15px 15px 0 0;
    }
/*                                       */
    .display-list li {
        display: flex;
        width: 100%;
    }

    .display-list .product-name {
        width: 49%;
        padding-left: 5px;
        font-size: 1.4em;
    }
    
    .display-list .product-quantity {
        width: 17%;
        text-align: right;
        font-size: 1.4em;
    }

    .display-list .product-per-price {
        width: 17%;
        text-align: right;
        font-size: 1.4em;
        padding-right: 5px;
    }
    
    .display-list .product-total-price {
        width: 17%;
        text-align: right;
        font-size: 1.4em;
        padding-right: 5px;
    }

    .display-list .products-total-price {
        text-align: right;
        padding-right: 5px;
        font-size: 1.4em;
    }

    .check-cancel-button {
        display: flex;
        justify-content: space-around;
    }
    
    .check-cancel-button button {
        width: 30%;
        height: 30px;
        font-size: 1.4em;
        border: none;
        background-color: #c58456;
        color: white;
        border-radius: 5px;
        margin: 8px 0;
    }
    
    .products-section {
        width: 85%;
        min-height: 80vh;
        margin: 50px auto;
        display: flex;
        justify-content: space-between;
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 75%;
        gap: 40px;
    }

    .product {
        width: 100%;
        height: 280px;
        background: linear-gradient(135deg, rgb(247, 244, 238), rgb(215, 196, 158));
        box-shadow: 5px 5px 10px hsl(0, 0%, 50%);
        border-radius: 15px;
        overflow: hidden;
    }

    .product img {
        width: 100%;
        height: 60%;
        object-fit: cover;
    }

    .product h3 {
        padding-left: 15px;
        margin-top: -5px;
    }

    .product p {
        padding: 0 8px;
        font-size: 0.9em;
    }

    .product button {
        display: block;
        margin: auto;
        border: none;
        background-color: #ca956f;
        padding: 7px 20px;
        border-radius: 99px;
        color: rgb(247, 247, 247);
    }

    .product button:hover {
        cursor: pointer;
    }
</style>
