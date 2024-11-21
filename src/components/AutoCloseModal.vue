<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        modalToggle: Boolean
    })
    const closeModal = ref(null);

    watch(() => props.modalToggle, () => {
        closeModal.value.classList.remove('hidden');
        closeModal.value.classList.remove('fade-out');

        setTimeout(()=> {
            closeModal.value.classList.add('fade-out');
        }, 0)
    })
</script>

<template>
    <div ref="closeModal" class="modal hidden">
        <div class="modal-wrapper">
            <p>
                <slot></slot>
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