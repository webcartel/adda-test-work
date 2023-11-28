<template>
    <div class="list" v-for="list in mainStore.getListsWithCheckedItems" :key="list.id">
        <div class="list__header">
            <div class="list__header_name">List {{ list.id + 1 }}</div>
            <div class="list__header_sort">
                <span v-if="list.sorted" @click="mainStore.listRand(list.id, randomArray(list.items))">Перемешать</span>
                <span v-else @click="mainStore.listSort(list.id)">Сортировать</span>
            </div>
        </div>
        <div class="list__body">
            <div class="list__row" v-show="list.sorted && row.length" v-for="row in sortedArray(list.items)" :key="row.id">
                <div
                    class="list__item"
                    :style="{ backgroundColor: item.color }"
                    v-for="(item, index) in row"
                    :key="index"
                    @click="mainStore.decrementItemQuantity(list.id, item.id); mainStore.listSort(list.id)"
                ></div>
            </div>
            <div class="list__row" v-show="!list.sorted">
                <div
                    class="list__item"
                    :style="{ backgroundColor: item.color }"
                    v-for="(item, index) in mainStore.lists[list.id].randItems"
                    :key="index"
                    @click="mainStore.decrementItemQuantity(list.id, item.id); mainStore.listRand(list.id, randomArray(list.items))"
                ></div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

function sortedArray(items) {
    const outputArr = []

    items.forEach((item) => {
        if ( item.selected ) {
            outputArr.push(new Array(item.quantity).fill(item))
        }
    })

    return outputArr

}

function randomArray(items) {
    let outputArr = []

    items.forEach((item) => {
        if ( item.selected ) {
            outputArr = outputArr.concat(new Array(item.quantity).fill(item))
        }
    })

    return shuffleArray(outputArr)

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

</script>



<style lang="scss" scoped>
.list {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #000;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    &__header_sort {
        padding: 6px 10px;
        background: #1578e9;
        color: #fff;
        border-radius: 4px;
        transition: background 0.15s;
        cursor: pointer;

        &:hover {
            background: darken(#1578e9, 10);
        }
    }

    &__row {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        gap: 5px;
    }

    &__item {
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid #000;
    }
}
</style>