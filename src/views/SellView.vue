<script setup>
    import Nav from '@/components/Nav.vue';
    import nutsData from '@/data/nut.json'

</script>

<template>
	<div class="main-layout">
		<Nav />
        <div class="products-section">
            <div class="product-sidebar">
                <div class="category-nav">
                    <ul>
                        <li>
                            <input id="flavored cashew nuts" type="checkbox" name="cate" />
                            <label for="flavored cashew nuts"> 風味腰果 [10]</label>
                        </li>
                        <li>
                            <input id="other" type="checkbox" name="cate" />
                            <label for="other"> 其他 [2]</label>
                        </li>
                    </ul>
                </div>
                <hr />
                <div class="cart-preview">
                    <div class="cart">
                        <ul>
                            <li>
                                <p>經典可可風味腰果</p>
                                <div class="purchase-quantity">
                                    <button>-</button>
                                    <input type="number" />
                                    <button>+</button>
                                </div>
                            </li>
                            <li>
                                <p>芥末風味腰果</p>
                                <div class="purchase-quantity">
                                    <button>-</button>
                                    <input type="number" />
                                    <button>+</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div class="total-price">
                        <p>總金額: 30元</p>
                    </div>
                    <button>確認購買</button>
                </div>
            </div>
            <div class="product-list">
                <div class="product" v-for="(nut, index) in nutsData" :key="index">
                    <img :src="nut.img" :alt="nut.name + '圖片'">
                    <div class="describe">
                        <h3>{{ nut.name }}</h3>
                        <p>{{ nut.introduction.short }}</p>
                        <button>加入購物車</button>
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

    ul {
        list-style-type: none;
    }
    
    .cart li {
        display: flex;
        justify-content: space-between;
    }

    .cart li input[type='number']{
        width: 30px;
        height: 100%;
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

    .products-section {
        width: 85%;
        margin: 50px auto;
        display: flex;
        justify-content: space-between;
    }

    .product-sidebar {
        position: sticky;
        top: 140px;
        width: 20%;
        height: 100px;
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
</style>
