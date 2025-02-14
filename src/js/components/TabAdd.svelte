<script>
    import { onMount } from 'svelte'

    import BookmarkForm from './BookmarkForm.svelte'

    import { bookmarkCountChanged$ } from '../api/streams'
    import { getCurrentTab, tabsChanged$ } from '../api/tabs'
    import { currentTab } from '../stores/currentTab'
    import { dropdownShown } from '../stores/dropdown'
    import { search } from '../stores/search'

    export let active = true

    $: expanded = $dropdownShown === 'search' ? $search.last : $dropdownShown

    async function currentTabInfo () {
        const tab = await getCurrentTab()

        // console.debug('[Popup] currentTabInfo:', tab)
        $currentTab = { ...tab }
    }

    onMount(() => {
        currentTabInfo()

        // Refresh contents when bookmarks or tabs change
        bookmarkCountChanged$.observe(currentTabInfo)
        tabsChanged$.observe(currentTabInfo)
    })
</script>

<div class="card" class:expanded class:d-hide={ !active }>
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
