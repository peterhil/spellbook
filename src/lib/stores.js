import { writable } from 'svelte/store'

export const emptyBookmark = {
  title: '',
  url: '',
  favIconUrl: '',
  category: '',
}
export const emptySelection = { title: null, id: null, parentId: null }

export const currentTab = writable({}, function start (set) {
  set(emptyBookmark)

  return function stop () {}
})

export const selectionStore = writable({}, () => {
  console.log('got a subscriber')
  return () => console.log('no more subscribers')
})

export const dropdownStore = writable(null)
