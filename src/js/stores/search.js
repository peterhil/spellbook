// stores/search.js

import { writable } from 'svelte/store'

const initial = {
    query: '',
    last: '',
    results: [],
}

export const search = writable(initial)
