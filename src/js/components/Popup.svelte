<script>
    import TabAdd from './TabAdd.svelte'
    import TabUrlSearch from './TabUrlSearch.svelte'
    import Tabs from './Tabs.svelte'

    import { t } from '../lib/translate'

    const tabs = [
        { id: 'add', label: t('tab_add'), component: TabAdd },
        { id: 'url', label: t('tab_url'), component: TabUrlSearch },
    ]
    let mode = tabs[0]
</script>

<div class="popup">
    <div class="popup-header">
        <div class="stripe stripe-bg">
            <h1>Spellbook</h1>
        </div>
        <Tabs {tabs} bind:active={mode} />
    </div>
    <div class="popup-body">
        <svelte:component this={mode.component} />
    </div>
</div>
