<script>
    import { messages } from '../lib/messaging'
    import { onDestroy, onMount } from 'svelte'
    import CategoryList from './CategoryList.svelte'

    export let recentCategories = []

    const updateRecentCategories = (categories) => {
        console.debug('updateRecentCategories:', categories)
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
    <CategoryList categories={recentCategories} />
</ul>
