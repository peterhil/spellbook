<script>
    import { indexBy, prop, sortBy, toPairs } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import { getCurrentTab } from '../api/tabs'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'

    import { currentTab } from '../stores/currentTab'
    import { savedBookmarks } from '../stores/savedBookmarks'

    import Bookmark from './Bookmark.svelte'
    import BookmarkForm from './BookmarkForm.svelte'
    import CloseButton from './CloseButton.svelte'

    $: bookmarkCount = $savedBookmarks.size
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
        const sorted = sortBy(prop('dateAdded'), bookmarks)
        const saved = new Map(toPairs(indexBy(prop('id'), sorted)))
        // console.debug('[Popup] updateBookmarks:', { saved })

        $savedBookmarks = saved
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
        {#if $savedBookmarks}
            <div class="saved-bookmarks">
                {#each [...$savedBookmarks.values()] as bookmark}
                    <Bookmark {bookmark} />
                {/each}
            </div>
        {/if}
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
