<script>
    import browser from 'webextension-polyfill'

    import { indexBy, prop, sortBy, toPairs } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import Bookmark from './Bookmark.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { activeTabQuery } from '../api/tabs'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { savedBookmarks } from '../stores/savedBookmarks'

    $: bookmarkCount = $savedBookmarks.size
    $: popupHeader = (
        bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark')
    )

    async function deleteBookmark (bookmark) {
        // console.debug('Deleting bookmark:', bookmark)
        return browser.bookmarks.remove(bookmark.id)
            .catch(console.error)
    }

    async function getSavedBookmarks () {
        const tabs = await browser.tabs.query(activeTabQuery)
        const tab = tabs[0]

        // console.debug('[Popup] getSavedBookmarks:', tab)
        if (tab) {
            messages.emit('api', { action: 'savedBookmarks', tab })
        }
    }

    function updateSavedBookmarks (bookmarks) {
        const sorted = sortBy(prop('dateAdded'), bookmarks || [])
        const saved = new Map(toPairs(indexBy(prop('id'), sorted)))
        // console.debug('[Popup] updateBookmarks sorted:', { bookmarks, sorted, saved })

        $savedBookmarks = saved
    }

    onMount(() => {
        messages.on('deleteBookmark', deleteBookmark)
        messages.on('savedBookmarks', updateSavedBookmarks)

        getSavedBookmarks()

        // Refresh contents when bookmarks change
        bookmarkCountChanged$.observe(getSavedBookmarks)
    })

    onDestroy(() => {
        messages.off('deleteBookmark', deleteBookmark)
        messages.off('savedBookmarks', updateSavedBookmarks)
    })
</script>

<div class="card">
    <div class="card-header">
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
    </div>
</div>
