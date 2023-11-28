import { defineStore } from 'pinia'


export const useMainStore = defineStore('main', {

    state: () => ({
        lists: [],
    }),

    getters: {
        getListsWithCheckedItems(state) {
            return state.lists.filter((list) => {
                if ( list.items.find((item) => item.selected) ) return true
            })
        },
    },

    actions: {
        addList(list) {
            this.lists.push(list)
        },

        updateItemSelected(listId, itemId) {
            this.lists[listId]['items'][itemId].selected = !this.lists[listId]['items'][itemId].selected
        },

        updateItemQuantity(listId, itemId, quantity) {
            this.lists[listId]['items'][itemId].quantity = quantity
        },

        decrementItemQuantity(listId, itemId) {
            const quantity = this.lists[listId]['items'][itemId].quantity
            this.lists[listId]['items'][itemId].quantity = quantity === 0 ? 0 : quantity - 1
        },

        updateItemColor(listId, itemId, color) {
            this.lists[listId]['items'][itemId].color = color
        },

        listSelectedToggle(listId, selected) {
            this.lists[listId].items = this.lists[listId].items.map((item) => {
                item.selected = selected
                return item
            })
        },

        listSort(listId) {
            this.lists[listId].sorted = true
        },

        listRand(listId, randomList = []) {
            this.lists[listId].sorted = false
            this.lists[listId].randItems = randomList
        },
    },

})