// stores/index.js

import { writable } from 'svelte/store'

const emptySelection = {
    title: null,
    id: null,
    parentId: null,
    subcategory: null
}

export const categorySelection = writable(
    emptySelection,
    () => {
        console.log('got a subscriber')
        return () => console.log('no more subscribers')
    }
)
