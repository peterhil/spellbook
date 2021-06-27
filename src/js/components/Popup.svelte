<script>
    import { last, prop, sortBy } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import { messages } from '../lib/messaging'
    import { currentTab } from '../stores/currentTab'
    import { getCurrentTab } from '../api/tabs'
    import { t } from '../lib/translate'
    import BookmarkForm from './BookmarkForm.svelte'
    import CloseButton from './CloseButton.svelte'

    let savedBookmarks = []
    let saved = null

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
        savedBookmarks = bookmarks
        if (bookmarks.length > 0) {
            saved = last(sortBy(prop('dateAdded'), savedBookmarks))
        }
        // console.debug('[Popup] updateBookmarks:', bookmarks, saved)
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

<div class="stripe"></div>
<div class="card">
    <div class="card-header">
        <CloseButton />
        <h1>
            { popupHeader }
            <span class="bookmark-count">({ bookmarkCount })</span>
        </h1>
    </div>
    <div class="card-body">
        {#if saved}
            <BookmarkForm bookmark={ saved } />
        {:else}
            <BookmarkForm bookmark={ $currentTab } />
        {/if}
    </div>
</div>
