// stores/index.js

import { writable } from 'svelte/store'

export const emptySelection = { title: null, id: null, parentId: null, subcategory: null }

export const selectionStore = writable(
    {},
    () => {
        console.log('got a subscriber')
        return () => console.log('no more subscribers')
    }
)
