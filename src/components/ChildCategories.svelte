<script>
  import { filter, sortBy } from 'fkit'
  import { onDestroy, onMount } from 'svelte'
  import { getChildren, isCategory } from '../api/bookmarks'
  import { messages } from '../lib/messaging'
  import { propertyCompare } from '../lib/pure'
  import CategoryList from './CategoryList.svelte'

  export let children = []

  async function updateChildren (category) {
    console.debug('Update children:', category)
    var results = await getChildren(category.id)
    children = sortBy(
      propertyCompare('title', true),
      filter(isCategory, results)
    )
  }

  onMount(() => {
    messages.on('categorySelection', updateChildren)
  })

  onDestroy(() => {
    messages.off('categorySelection', updateChildren)
  })
</script>

<ul class="menu" tabindex="-1"
    on:categorySelection={updateChildren}
    >
  <CategoryList categories={children} />
</ul>
