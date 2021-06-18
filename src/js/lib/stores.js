// lib/stores.js

import { writable } from 'svelte/store'

export const emptyBookmark = {
    title: '',
    url: '',
    favIconUrl: '',
    category: '',
}
export const emptySelection = { title: null, id: null, parentId: null, subcategory: null }

export const currentTab = writable(emptyBookmark)

export const selectionStore = writable({}, () => {
    console.log('got a subscriber')
    return () => console.log('no more subscribers')
})
