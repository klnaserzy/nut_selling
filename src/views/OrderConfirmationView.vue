<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import Nav from '@/components/Nav.vue'; // 導航組件

    // 使用 Vue Router 獲取當前路由
    const route = useRoute();

    // 定義購物車數據（使用 ref 以便響應式更新）
    const cart = ref([]);

    // 計算總金額：遍歷購物車，計算每項產品的總價格（單價 * 數量）
    const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.quantity * product.price, 0));

    // 定義訂單表單的初始值，包含個人、配送及付款相關信息
    const orderForm = ref({
        name: '',
        phone: '',
        email: '',
        address: '',
        zipcode: '',
        'delivery-method': '',
        'payment-method': '',
        'card-number': '',
        'expiry-data': '',
        cvv: '',
        invoice: ''
    });

    // 在組件掛載時從路由參數中加載購物車數據
    onMounted(() => {
        if (route.query.cart)
            cart.value = JSON.parse(route.query.cart); // 將 JSON 格式的購物車數據轉換為 JavaScript 對象
    });

    // 處理提交訂單表單的邏輯
    const handleSubmitPurchaseInfo = () => {
        // 提示確認訂單信息
        const confirmDelivery = confirm('是否確定訂購(沒有實際傳送任何資料)');

        if (confirmDelivery) {
            // 將訂單表單數據打印到控制台
            console.log(orderForm.value);

            // 顯示模擬的 `fetch` 請求代碼
            alert(`
                f12 查看傳送資料

                fetch('https://example.com/api/delivery', {
                    method: 'POST',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderForm.value)
                })
                    .then(response => {
                        if(!response.ok) throw new Error(response.statusText);
                        response.json();
                    })
                    .then(data => {
                        console.log('回應資料', data);
                    })
                    .catch(error => console.log('錯誤: ', error));
                    
                    `
            );
        }
    };
</script>

<template>
    <div class="main-layout">
        <!-- 導航區域 -->
        <Nav></Nav>
        
        <div class="trading-area">
            <!-- 購物車產品區域 -->
            <div class="products">
                <ul>
                    <!-- 遍歷購物車中的每個產品，顯示產品信息 -->
                    <li v-for="(product, index) in cart" :key="index">
                        <img :src="product.img" :alt="product.name" /> <!-- 產品圖片 -->
                        <div class="product-info">
                            <h2 class="name">{{ product.name }}</h2> <!-- 產品名稱 -->
                            <h3 class="per-price">單份價格：{{ product.price }}</h3> <!-- 單份價格 -->
                            <h3 class="quantity">購買數量：{{ product.quantity }}</h3> <!-- 購買數量 -->
                        </div>
                    </li>
                </ul>
                <h2 class="total-price">總金額：{{ totalPrice }}</h2> <!-- 顯示總金額 -->
            </div>

            <!-- 填寫表單區域 -->
            <div class="fill-out-form">
                <form @submit.prevent="handleSubmitPurchaseInfo"> <!-- 提交表單時觸發事件 -->
                    <!-- 個人基本資訊 -->
                    <div id="personal-area">
                        <p>個人基本資訊</p>
                        <div>
                            <label for="name">姓名:</label>
                            <input type="text" id="name" name="name" v-model="orderForm.name">
                        </div>
                        <div>
                            <label for="phone">聯絡電話:</label>
                            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" v-model="orderForm.phone">
                        </div>
                        <div>
                            <label for="email">電子郵件:</label>
                            <input type="email" id="email" name="email" v-model="orderForm.email">
                        </div>
                    </div>

                    <!-- 配送資訊 -->
                    <div id="deliver-area">
                        <p>配送資訊</p>
                        <div>
                            <label for="address">收件地址:</label>
                            <input type="text" id="address" name="address" v-model="orderForm.address">
                        </div>
                        <div>
                            <label for="zipcode">郵遞區號:</label>
                            <input type="text" id="zipcode" name="zipcode" v-model="orderForm.zipcode">
                        </div>
                        <label for="delivery-method">配送方式:</label>
                        <select id="delivery-method" name="delivery-method" v-model="orderForm['delivery-method']">
                            <option value="standard">標準配送</option>
                            <option value="express">快速配送</option>
                            <option value="scheduled">指定時段配送</option>
                        </select>
                    </div>
                
                    <!-- 付款資訊 -->
                    <div id="payment-area">
                        <p>付款資訊</p>
                        <label for="payment-method">付款方式:</label>
                        <select id="payment-method" name="payment-method" v-model="orderForm['payment-method']">
                            <option value="credit-card">信用卡</option>
                            <option value="bank-transfer">銀行轉帳</option>
                            <option value="mobile-pay">行動支付</option>
                        </select>

                        <!-- 信用卡相關資訊 -->
                        <div id="credit-card-info" class="payment-info">
                            <div>
                                <label for="card-number">信用卡號:</label>
                                <input type="text" id="card-number" name="card-number" pattern="[0-9]{16}" v-model="orderForm['card-number']">
                            </div>
                            <div>
                                <label for="expiry-date">有效日期:</label>
                                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" v-model="orderForm['expiry-date']">
                            </div>
                            <label for="cvv">安全碼:</label>
                            <input type="text" id="cvv" name="cvv" pattern="[0-9]{3}" v-model="orderForm.cvv">
                        </div>
                    </div>

                    <!-- 訂單備註 -->
                    <div id="order-note">
                        <p>訂單備註</p>
                        <div>
                            <label for="invoice">發票資訊:</label>
                            <input type="text" id="invoice" name="invoice" placeholder="若需公司發票請輸入統編" v-model="orderForm.invoice">
                        </div>
                        <div>
                            <label for="note">特殊需求:</label>
                            <textarea id="note" name="note" placeholder="備註或特殊需求..." rows="3" v-model="orderForm.note"></textarea>
                        </div>
                    </div>
                    <button type="submit">提交訂單(僅alert功能 但請勿輸入真實資料)</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main-layout {
        position: relative;
    }

    .trading-area {
        width: 100%;
        display: flex;
        position: relative;
    }

    .products{
        width: 50%;
        padding: 20px 80px;
    }

    .products li {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    img {
        width: 30%;
        height: 160px;
        object-fit: cover;
    }

    .total-price {
        margin: 20px 0 ;
    }

    .fill-out-form {
        position: fixed;
        right: 0;
        width: 50%;
    }

    form {
        width: 70%;
        margin: auto;
        margin-top: 30px;
    }

    form input {
        border: none;
        border-bottom: 1px solid hsl(0, 0%, 40%);
        background-color: transparent;
        outline: none;
    }

    form input:focus {
        border-bottom: 2px solid black;
    }

    form label {
        margin-left: 30px;
    }

</style>