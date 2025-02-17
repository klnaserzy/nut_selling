<script setup>
    import { ref, watch } from 'vue';

    // modalToggle 用於控制模態框的顯示
    const props = defineProps({
        modalToggle: Boolean
    })

    const closeModal = ref(null);  // 取得 DOM 元素

    // 使用 watch 監聽 props.modalToggle 的變化
    watch(() => props.modalToggle, () => {
        // 當 props.modalToggle 改變時，移除模態框的隱藏和淡出效果
        closeModal.value.classList.remove('hidden');
        closeModal.value.classList.remove('fade-out');

        // 設置一個短暫的延遲後再添加淡出效果，以觸發動畫
        setTimeout(() => {
            closeModal.value.classList.add('fade-out');
        }, 0)
    });
</script>

<template>
    <div ref="closeModal" class="modal hidden">
        <div class="modal-wrapper">
            <p>
                <slot></slot> <!-- 父組件動態插入內容 -->
            </p>
        </div>
    </div>
</template>

<style scoped>
    .modal {
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

    .modal-wrapper {
        width: 100%; 
        height: 100%; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
    }
</style>
