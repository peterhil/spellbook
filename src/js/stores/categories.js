// stores/categories

import { writable } from 'svelte/store'

const categories = {}
const store = writable(categories)

export default store
