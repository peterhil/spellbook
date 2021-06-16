<script>
    import { onDestroy, onMount } from 'svelte'

    import { messages } from '../lib/messaging'
    import { currentTab } from '../lib/stores'
    import { getCurrentTab } from '../api/tabs'
    import { t } from '../lib/translate'
    import BookmarkForm from '../components/BookmarkForm.svelte'
    import CloseButton from '../components/CloseButton.svelte'

    let savedBookmarks = []

    $: bookmarkCount = savedBookmarks.length
    $: popupHeader = (
        bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark')
    )

    function onClose () {
        window.close()
        return false
    }

    function updateBookmarks (bookmarks) {
        // console.log('[Popup] updateBookmarks:', bookmarks)
        savedBookmarks = bookmarks
    }

    onMount(() => {
        messages.on('bookmarkStatus', updateBookmarks)
        messages.on('button:close', onClose)

        getCurrentTab().then(tab => {
            // console.debug('[Popup] current tab:', tab)
            $currentTab = { ...tab }
            messages.emit('api', { type: 'bookmarkStatus', tab })
        })
    })

    onDestroy(() => {
        messages.off('bookmarkStatus', updateBookmarks)
        messages.off('button:close', onClose)
    })
</script>

<style>
    h1 {
        margin-top: 0.25rem;
        color: #333;
    }
</style>

<CloseButton />

<h1>
    { popupHeader }
    <span class="bookmark-count">({ bookmarkCount })</span>
</h1>

<BookmarkForm bookmark={$currentTab} />
