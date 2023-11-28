<template>
    <div>
        <List v-for="list in mainStore.lists" :key="list.id" :listData="list" />
    </div>
</template>



<script setup>
import List from '@/components/List.vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

</script>



<style lang="scss" scoped>

</style>