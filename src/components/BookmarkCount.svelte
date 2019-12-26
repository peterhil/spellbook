<script>
  import { messages } from '../lib/messaging'
  import { onDestroy, onMount } from 'svelte'

  let bookmarked = []
  $: bookmarkCount = bookmarked.length

  function updateBookmarks (bookmarks) {
    console.log('Got bookmarks:', bookmarks)
    bookmarked = bookmarks
  }

  onMount(() => {
    messages.on('bookmarkStatus', updateBookmarks)
  })

  onDestroy(() => {
    messages.off('bookmarkStatus', updateBookmarks)
  })
</script>

<span class="bookmark-count">({ bookmarkCount })</span>
