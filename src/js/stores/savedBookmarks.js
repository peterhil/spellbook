// stores/savedBookmarks.js

import { writable } from 'svelte/store'

const saved = new Map()

function createStore () {
    const store = writable(saved)

    return {
        ...saved,
        ...store,
        getBookmark: (tabId) => saved.get(tabId),
        setBookmark: (tabId, bookmark) => saved.set(tabId, bookmark),
        reset: () => saved.clear(),
    }
}

export const savedBookmarks = createStore()
