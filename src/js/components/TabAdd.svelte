<script>
    import browser from 'webextension-polyfill'

    import { onMount } from 'svelte'

    import BookmarkForm from './BookmarkForm.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { activeTabQuery, tabsChanged$ } from '../api/tabs'
    import { currentTab } from '../stores/currentTab'
    import { dropdownShown } from '../stores/dropdown'

    async function currentTabInfo () {
        // console.time('currentTabInfo')
        const tabs = await browser.tabs.query(activeTabQuery)
        const tab = tabs[0]

        // console.debug('[Popup] currentTabInfo:', tab)
        if (tab) {
            $currentTab = { ...tab }
        }
        // console.timeEnd('currentTabInfo')
    }

    onMount(() => {
        currentTabInfo()

        // Refresh contents when bookmarks or tabs change
        bookmarkCountChanged$.observe(currentTabInfo)
        tabsChanged$.observe(currentTabInfo)
    })
</script>

<div class="card" class:expanded={ $dropdownShown }>
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
