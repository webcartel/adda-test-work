<template>
    <div class="list">
        <div class="list__header">
            <div class="list__corner" :class="{ open: isOpen }" @click="isOpen = !isOpen"></div>
            <div class="list__checkbox" :class="{ checked: isChecked }" @click="itemsSelectedToggle"></div>
            <div class="list__name">List {{ listData.id + 1 }}</div>
        </div>
        <div class="list__body" v-if="isOpen">
            <ListItem class="list_item" v-for="item in listData.items" :key="`${listData.id}-${item.id}`" :listId="listData.id" :itemData="item" />
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue'
import ListItem from '@/components/ListItem.vue'
import { useMainStore } from '@/stores/main'

const props = defineProps(['listData'])

const mainStore = useMainStore()

const isChecked = ref(false)
const isOpen = ref(false)

function itemsSelectedToggle() {
    isChecked.value = !isChecked.value
    mainStore.listSelectedToggle(props.listData.id, isChecked.value)
}

</script>



<style lang="scss" scoped>
.list {

    &__header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    &__body {
        margin-bottom: 40px;
    }

    &__checkbox {
        position: relative;
        display: block;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        border: 1px solid #000;

        &.checked {
            &::before {
                content: '';
                position: absolute;
                top: 4px;
                left: 4px;
                width: 10px;
                height: 10px;
                background: #999;
            }
        }
    }

    &__corner {
        position: relative;
        display: block;
        margin-right: 10px;
        width: 20px;
        height: 20px;

        &::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 1px;
            width: 10px;
            height: 10px;
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
            transform: rotate(-45deg);
        }

        &.open {
            &::before {
                top: 1px;
                left: 4px;
                transform: rotate(45deg);
            }
        }
    }
}
.list_item {
    padding-left: 50px;
    margin-bottom: 10px;
}
</style>