<template>
    <div class="list_item">
        <div class="list_item__checkbox" :class="{ checked: itemData.selected }" @click="checkToggle"></div>
        <div class="list_item__name">Item {{ itemData.id + 1 }}</div>
        <input type="text" class="list_item__quantity" :value="itemData.quantity" @input="changeQuantity">
        <input type="color" class="list_item__color" :value="itemData.color" @change="changeColor">
    </div>
</template>



<script setup>
import { useMainStore } from '@/stores/main'

const props = defineProps(['itemData', 'listId'])

const mainStore = useMainStore()

function checkToggle() {
    mainStore.updateItemSelected(props.listId, props.itemData.id)
}

function changeQuantity(e) {
    mainStore.updateItemQuantity(props.listId, props.itemData.id, parseInt(e.target.value))
}

function changeColor(e) {
    mainStore.updateItemColor(props.listId, props.itemData.id, e.target.value)
}

</script>



<style lang="scss" scoped>
.list_item {
    display: flex;
    align-items: center;

    &__checkbox {
        position: relative;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        border: 1px solid #000;

        &.checked {
            &::before {
                content: '';
                position: absolute;
                top: 1px;
                left: 5px;
                display: block;
                width: 5px;
                height: 10px;
                border-bottom: 2px solid #000;
                border-right: 2px solid #000;
                transform: rotate(45deg);
            }
        }
    }

    &__name {
        margin-right: auto;
    }

    &__quantity {
        display: block;
        margin-right: 15px;
        padding: 4px;
        width: auto;
        max-width: 40px;
        text-align: right;
        border: none;
    }

    &__color {
        display: block;
        width: 20px;
        height: 20px;
        border: none;

        &::-webkit-color-swatch-wrapper{
            padding: 0;
        }

        &::-webkit-color-swatch {
            border: none;
        }
    }
}

</style>