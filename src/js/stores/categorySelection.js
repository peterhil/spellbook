// stores/categorySelection.js

import { writable } from 'svelte/store'

const emptyCategory = {
    title: null,
    id: null,
    parentId: null,
}

function createStore () {
    const store = writable(emptyCategory)

    return {
        ...store,
        reset: () => store.set(emptyCategory),
    }
}

export const categorySelection = createStore()
