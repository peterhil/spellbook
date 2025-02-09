<script>
    import browser from 'webextension-polyfill'

    import { onMount } from 'svelte'

    import BookmarkForm from './BookmarkForm.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { activeTabQuery } from '../api/tabs'
    import { currentTab } from '../stores/currentTab'

    async function currentTabStatus () {
        const tabs = await browser.tabs.query(activeTabQuery)
        const tab = tabs[0]

        // console.debug('[Popup] currentTabStatus:', tab)
        if (tab) {
            $currentTab = { ...tab }
        }
    }

    onMount(() => {
        currentTabStatus()

        // Refresh contents when bookmarks change
        bookmarkCountChanged$.observe(currentTabStatus)
    })
</script>

<div class="card">
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
