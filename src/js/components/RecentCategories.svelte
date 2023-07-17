<script>
    import { onDestroy, onMount } from 'svelte'

    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import CategoryMenu from './CategoryMenu.svelte'

    export let recentCategories = []

    const updateRecentCategories = (categories) => {
        // console.debug('[RecentCategories] updateRecentCategories:', categories)
        recentCategories = categories
    }

    onMount(() => {
        messages.on('recentCategories', updateRecentCategories)
    })

    onDestroy(() => {
        messages.off('recentCategories', updateRecentCategories)
    })
</script>

<ul class="menu" tabindex="-1">
    <small class="toast">{ t('recent_categories') }</small>
    <CategoryMenu categories={recentCategories} />
</ul>
