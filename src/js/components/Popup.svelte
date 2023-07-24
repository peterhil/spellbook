<script>
    import browser from 'webextension-polyfill'
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
    import Explore from './Explore.svelte'

    $: bookmarkCount = $savedBookmarks.size
    $: popupHeader = (
        bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark')
    )

    async function deleteBookmark (bookmark) {
        // console.debug('Deleting bookmark:', bookmark)
        browser.bookmarks.remove(bookmark.id)
            .then(() => {
                // console.info('Bookmark deleted:', bookmark)
                location.reload()
            })
            .then(updateStatus)
            .catch(console.error)
    }

    function onClose () {
        window.close()
        return false
    }

    function updateStatus () {
        getCurrentTab().then(tab => {
            // console.debug('[Popup] updating bookmark status:', { tab })
            $currentTab = { ...tab }
            messages.emit('api', { action: 'bookmarkStatus', tab })
        })
    }

    function updateBookmarks (bookmarks) {
        const sorted = sortBy(prop('dateAdded'), bookmarks || [])
        const saved = new Map(toPairs(indexBy(prop('id'), sorted)))
        // console.debug('[Popup] updateBookmarks sorted:', { sorted, saved })

        // TODO Use separate store?
        $savedBookmarks = saved
    }

    onMount(() => {
        messages.on('bookmarkStatus', updateBookmarks)
        messages.on('button:close', onClose)
        messages.on('deleteBookmark', deleteBookmark)

        messages.emit('api', { action: 'recentCategories' })

        updateStatus()
    })

    onDestroy(() => {
        messages.off('bookmarkStatus', updateBookmarks)
        messages.off('button:close', onClose)
        messages.off('deleteBookmark', deleteBookmark)
    })
</script>

<div class="stripe"></div>
<div class="card">
    <Explore />
    <div class="card-header">
        <CloseButton />
        <h1>
            { popupHeader }
            <span class="bookmark-count">({ bookmarkCount })</span>
        </h1>
    </div>
    <div class="card-body">
        <div class="saved-bookmarks">
            {#each [...$savedBookmarks.values()] as bookmark (bookmark.id)}
                <Bookmark {bookmark} />
            {/each}
        </div>
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
