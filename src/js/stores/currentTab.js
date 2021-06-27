// stores/currentTab.js

import { writable } from 'svelte/store'

const emptyBookmark = {
    title: '',
    url: '',
    favIconUrl: '',
    category: '',
}

export const currentTab = writable(emptyBookmark)
