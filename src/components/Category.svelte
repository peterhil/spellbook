<script>
  import { messages } from '../lib/messaging'
  import { getParentId } from '../platform/common/bookmarks.js'
  import BookmarkPath from './BookmarkPath.svelte'

  export let category
  let elem

  function onClick (event) {
    const selection = { ...elem.dataset }
    console.debug('Category clicked:', selection, event)
    messages.trigger('categorySelected', selection)
    return false
  }
</script>

<a href="#{category.id}" class="category" tabindex="0"
   bind:this={elem}
   on:click={onClick}
   data-title={category.title}
   data-id={category.id}
   data-parent-id={getParentId(category)}
   >
  <div class="title">{category.title}</div>
  <BookmarkPath bookmark={category} />
</a>
