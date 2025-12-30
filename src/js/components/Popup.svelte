<script>
    import { indexBy, prop, sortBy, toPairs } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import TabAdd from './TabAdd.svelte'
    import TabUrlSearch from './TabUrlSearch.svelte'
    import Tabs from './Tabs.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { getCurrentTab } from '../api/tabs'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { savedBookmarks } from '../stores/savedBookmarks'

    const tabs = [
        { id: 'add', label: t('tab_add'), component: TabAdd },
        { id: 'url', label: t('saved_bookmark'), component: TabUrlSearch },
    ]
    let mode = $state(tabs[0])

    let bookmarkCount = $derived($savedBookmarks.size)

    async function updateState () {
        const tab = await getCurrentTab()

        // console.debug('[Popup] updateState:', tab)
        messages.emit('api', { action: 'savedBookmarks', tab })
        messages.emit('api', { action: 'recentCategories' })
    }

    function updateSavedBookmarks (bookmarks) {
        const sorted = sortBy(prop('dateAdded'), bookmarks || [])
        const saved = new Map(toPairs(indexBy(prop('id'), sorted)))
        // console.debug('[Popup] updateBookmarks sorted:', { bookmarks, sorted, saved })

        $savedBookmarks = saved
    }

    onMount(() => {
        messages.on('savedBookmarks', updateSavedBookmarks)

        updateState()

        // Refresh contents when bookmarks change
        bookmarkCountChanged$.observe(updateState)
    })

    onDestroy(() => {
        messages.off('savedBookmarks', updateSavedBookmarks)
    })
</script>

<div class="popup">
    <div class="popup-header">
        <div class="stripe stripe-bg">
            <div>
                <h1>Spellbook</h1>
            </div>
            <div class="status">
                {#if bookmarkCount > 0}
                    <h1>
                        {bookmarkCount}
                    </h1>
                {/if}
            </div>
        </div>
        <Tabs {tabs} bind:active={mode} />
    </div>
    <div class="popup-body">
        <TabAdd active={ mode.id === 'add' } />
        <TabUrlSearch active={ mode.id === 'url' } />
    </div>
</div>
