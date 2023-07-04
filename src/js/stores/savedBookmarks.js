// stores/savedBookmarks.js

import { writable } from 'svelte/store'

const saved = new Map()

function createStore () {
    const store = writable(saved)

    return {
        ...saved,
        ...store,
        getBookmark: (id) => saved.get(id),
        setBookmark: (id, bookmark) => saved.set(id, bookmark),
        reset: () => saved.clear(),
    }
}

export const savedBookmarks = createStore()
