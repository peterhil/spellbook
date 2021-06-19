// stores/search.js

import { writable } from 'svelte/store'

const initial = {
    last: '',
    query: '',
    results: [],
}

export const search = writable(initial)
