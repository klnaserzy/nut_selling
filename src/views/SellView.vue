<script setup>
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import Nav from '@/components/Nav.vue'; 
    import AutoCloseModal from '@/components/AutoCloseModal.vue';
    import ShoppingCartSideBar from '@/components/ShoppingCartSideBar.vue';

    import nutsData from '@/utils/nut.js';
    
    const router = useRouter();  // 獲取路由對象，用於導航到其他頁面

    // 購物車的初始化數據
    const cart = ref([]);

    // 模態框的顯示狀態
    const modalToggle = ref(true); // 加入購物車提示的顯示狀態
    const purchaseModalToggle = ref(false); // 購買清單模態框的顯示狀態
    const purchaseModal = ref(null); // 購買模態框的 DOM 引用
    const closePurchaseModalButton = ref(null); // 關閉購買模態框按鈕的 DOM 引用

    // 本地堅果數據，用於顯示在商品列表中
    const localNutsData = ref(nutsData);
    const localNutsDataFilter = ref(localNutsData.value); // 用於篩選的堅果數據

    // 計算總金額
    const totalPrice = computed(() => 
        cart.value.reduce((acc, product) => acc + product.quantity * product.price, 0)
    );

    // 計算總重量
    const totalWeight = computed(() => 
        cart.value.reduce((acc, product) => acc + product.quantity * product.weight, 0)
    );

    // 處理加入購物車的邏輯
    const handleAddProduct = (addProduct) => {
        // 如果商品已存在於購物車，顯示提示模態框
        if (cart.value.some(product => product.name === addProduct.name)) {
            modalToggle.value = !modalToggle.value;
            return;
        }

        // 如果商品不存在於購物車，將商品添加到購物車
        cart.value.push({
            name: addProduct.name,
            quantity: 1, // 初始購買數量為 1
            price: addProduct.price,
            img: addProduct.img,
            weight: addProduct.weight
        });
    };

    // 控制購買模態框的顯示/隱藏
    const handleTogglePurchaseModal = (e, toggle) => {
        if (toggle) {
            purchaseModalToggle.value = true; // 打開模態框
        } else {
            // 如果點擊的是模態框本身或關閉按鈕，隱藏模態框
            if (e.target === purchaseModal.value || e.target === closePurchaseModalButton.value)
                purchaseModalToggle.value = false;
        }
    };

    // 處理確認購買的邏輯
    const handleConfirmationPurchase = () => {
        // 導航到 OrderConfirmation 頁面，並通過查詢參數傳遞購物車數據
        router.push({
            name: 'OrderConfirmation',
            query: { cart: JSON.stringify(cart.value) }
        });
    };
</script>

<template>
	<div class="main-layout">
		<!-- 頂部導航 -->
		<Nav />

        <!-- 自動關閉的模態框，顯示加入購物車的提示 -->
        <AutoCloseModal :modalToggle="modalToggle">已加入到購物車</AutoCloseModal>

        <!-- 購買清單模態框 -->
        <div @click="(e) => handleTogglePurchaseModal(e)" v-if="purchaseModalToggle" ref="purchaseModal" class="purchase-modal">
            <div class="purchase-wrapper">
                <div class="check-list">
                    <h2>購買清單</h2>
                    <div class="display-list">
                        <!-- 商品清單 -->
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
                        <p class="products-total-weight">總重量: {{ totalWeight / 1000 }}kg</p>
                        <!-- 確認或取消按鈕 -->
                        <div class="check-cancel-button">
                            <button @click="handleConfirmationPurchase" class="check">確認購買</button>
                            <button @click="(e) => handleTogglePurchaseModal(e)" ref="closePurchaseModalButton" class="cancel">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品展示區域 -->
        <div class="products-section">
            <!-- 側邊欄，用於篩選商品 -->
            <ShoppingCartSideBar 
                v-model:localNutsDataFilter="localNutsDataFilter" 
                :cart="cart" 
                :totalPrice="totalPrice" 
                :purchaseModal="purchaseModal"
                @showPurchaseModal="(toggle) => handleTogglePurchaseModal(e, toggle)"
            ></ShoppingCartSideBar>

            <!-- 商品列表 -->
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

    .display-list .products-total-weight {
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
