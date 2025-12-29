<script>
    import { onDestroy, onMount } from 'svelte'

    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import CategoryMenu from './CategoryMenu.svelte'

    let { recentCategories = $bindable([]) } = $props();

    function getRecentCategories () {
        messages.emit('api', { action: 'recentCategories' })
    }

    function updateRecentCategories (categories) {
        // console.debug('[RecentCategories] updateRecentCategories:', categories)
        recentCategories = categories
    }

    onMount(() => {
        messages.on('recentCategories', updateRecentCategories)
        getRecentCategories()
    })

    onDestroy(() => {
        messages.off('recentCategories', updateRecentCategories)
    })
</script>

<ul class="menu" tabindex="-1">
    <small class="toast">{ t('recent_categories') }</small>
    <CategoryMenu categories={recentCategories} />
</ul>
