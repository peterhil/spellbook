<script>
    import TabAdd from './TabAdd.svelte'
    import TabUrlSearch from './TabUrlSearch.svelte'
    import Tabs from './Tabs.svelte'

    import { t } from '../lib/translate'
    import { savedBookmarks } from '../stores/savedBookmarks'

    const tabs = [
        { id: 'add', label: t('tab_add'), component: TabAdd },
        { id: 'url', label: t('tab_url'), component: TabUrlSearch },
    ]
    let mode = tabs[0]

    $: bookmarkCount = $savedBookmarks.size
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
        <svelte:component this={mode.component} />
    </div>
</div>
