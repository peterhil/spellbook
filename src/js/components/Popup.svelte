<script>
    import browser from 'webextension-polyfill'
    import { indexBy, prop, sortBy, toPairs } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import { activeTabQuery } from '../api/tabs'
    import { messages } from '../lib/messaging'
    import { bookmarkCountChanged$ } from '../api/streams'
    import { t } from '../lib/translate'

    import { currentTab } from '../stores/currentTab'
    import { savedBookmarks } from '../stores/savedBookmarks'

    import Bookmark from './Bookmark.svelte'
    import BookmarkForm from './BookmarkForm.svelte'
    import CloseButton from './CloseButton.svelte'
    import Tabs from './Tabs.svelte'

    $: bookmarkCount = $savedBookmarks.size
    $: popupHeader = (
        bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark')
    )

    async function currentTabStatus () {
        const tabs = await browser.tabs.query(activeTabQuery)
        const tab = tabs[0]

        // console.debug('[Popup] currentTabStatus:', tab)
        if (tab) {
            $currentTab = { ...tab }
            messages.emit('api', { action: 'savedBookmarks', tab })
        }
    }

    async function deleteBookmark (bookmark) {
        // console.debug('Deleting bookmark:', bookmark)
        browser.bookmarks.remove(bookmark.id)
            .catch(console.error)
    }

    function onClose () {
        window.close()
        return false
    }

    function updateSavedBookmarks (bookmarks) {
        const sorted = sortBy(prop('dateAdded'), bookmarks || [])
        const saved = new Map(toPairs(indexBy(prop('id'), sorted)))
        // console.debug('[Popup] updateBookmarks sorted:', { bookmarks, sorted, saved })

        $savedBookmarks = saved
    }

    onMount(() => {
        messages.on('savedBookmarks', updateSavedBookmarks)
        messages.on('button:close', onClose)
        messages.on('deleteBookmark', deleteBookmark)

        currentTabStatus()

        messages.emit('api', { action: 'recentCategories' })

        // Refresh contents when bookmarks change
        bookmarkCountChanged$.observe(currentTabStatus)
    })

    onDestroy(() => {
        messages.off('savedBookmarks', updateSavedBookmarks)
        messages.off('button:close', onClose)
        messages.off('deleteBookmark', deleteBookmark)
    })
</script>

<div class="stripe"></div>
<div class="card">
    <Tabs />
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
