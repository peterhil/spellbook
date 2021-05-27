<script>
  import { currentTab } from '../lib/stores'
  import { messages } from '../lib/messaging'
  import { onDestroy, onMount } from 'svelte'
  import { t } from '../lib/translate'
  import BookmarkForm from '../components/BookmarkForm.svelte'
  import CloseButton from '../components/CloseButton.svelte'

  let bookmarked = []
  $: bookmarkCount = bookmarked.length
  $: popupHeader = (
    bookmarkCount >= 1
      ? t('saved_bookmark')
      : t('add_bookmark')
  )

  function onClose () {
    window.close()
    return false
  }

  function onTabUpdate (tab) {
    $currentTab = { ...tab }
  }

  function updateBookmarks (bookmarks) {
    console.log('Got bookmarks:', bookmarks)
    bookmarked = bookmarks
  }

  onMount(() => {
    messages.on('currentTabInfo', onTabUpdate)
    messages.on('bookmarkStatus', updateBookmarks)
    messages.on('button:close', onClose)
  })

  onDestroy(() => {
    messages.off('currentTabInfo', onTabUpdate)
    messages.off('bookmarkStatus', updateBookmarks)
    messages.off('button:close', onClose)
  })
</script>

<style>
  h1 {
    color: #333;
    margin-top: 0.25rem;
  }
</style>

<CloseButton />

<h1>
  { popupHeader }
  <span class="bookmark-count">({ bookmarkCount })</span>
</h1>

<BookmarkForm bookmark={$currentTab} />
