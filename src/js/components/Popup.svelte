<script>
    import browser from 'webextension-polyfill'

    import { onMount } from 'svelte'

    import TabAdd from './TabAdd.svelte'
    import TabUrlSearch from './TabUrlSearch.svelte'
    import Tabs from './Tabs.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { activeTabQuery } from '../api/tabs'
    import { t } from '../lib/translate'
    import { currentTab } from '../stores/currentTab'

    const tabs = [
        { id: 'add', label: t('tab_add'), component: TabAdd },
        { id: 'url', label: t('tab_url'), component: TabUrlSearch },
    ]
    let mode = tabs[0]

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

<div class="popup">
    <div class="stripe"></div>
    <Tabs {tabs} bind:active={mode} />
    <svelte:component this={mode.component} />
</div>
