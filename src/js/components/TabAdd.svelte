<script>
    import browser from 'webextension-polyfill'

    import { onMount } from 'svelte'

    import BookmarkForm from './BookmarkForm.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { activeTabQuery } from '../api/tabs'
    import { currentTab } from '../stores/currentTab'
    import { dropdownShown } from '../stores/dropdown'

    async function currentTabInfo () {
        const tabs = await browser.tabs.query(activeTabQuery)
        const tab = tabs[0]

        // console.debug('[Popup] currentTabInfo:', tab)
        if (tab) {
            $currentTab = { ...tab }
        }
    }

    onMount(() => {
        currentTabInfo()

        // Refresh contents when bookmarks change
        bookmarkCountChanged$.observe(currentTabInfo)
    })
</script>

<div class="card" class:expanded={ $dropdownShown }>
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
