<template>
    <div class="app">

        <div class="left_panel">
            <Lists />
        </div>

        <div class="right_panel">
            <SelectedLists />
        </div>

    </div>
</template>



<script setup>
import { onMounted } from 'vue'
import { getRandomNumber, getRandomHexColor } from '@/utils/common'
import { useMainStore } from '@/stores/main'

import Lists from '@/components/Lists.vue'
import SelectedLists from '@/components/SelectedLists.vue'

const mainStore = useMainStore()

onMounted(() => {
    init()
})

// Функция инициализации начальных данных
function init() {
    for (let i1 = 0; i1 < 5; i1++) {
        let items = []

        for (let i2 = 0; i2 < getRandomNumber(4, 10); i2++) {
            items.push({
                id: i2,
                quantity: getRandomNumber(1, 20),
                color: getRandomHexColor(),
                selected: false,
            })
        }

        mainStore.addList({
            id: i1,
            items: items,
            sorted: true,
            randItems: [],
        })
    }
}

</script>



<style lang="scss" scoped>
.app {
    display: flex;
    margin: 0 auto;
    max-width: 1200px;
    min-height: 100vh;
    gap: 30px;
}

.left_panel {
    padding: 25px 10px;
    flex: 1;
}

.right_panel {
    padding: 25px 10px;
    flex: 1;
}

</style>