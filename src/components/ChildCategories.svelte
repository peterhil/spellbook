<script>
    import { filter } from 'rambda'
    import { onDestroy, onMount } from 'svelte'
    import { getChildren } from '../api/categories'
    import { isCategory } from '../api/helpers'
    import { messages } from '../lib/messaging'
    import { sortByTitleCaseInsensitive } from '../lib/pure'
    import CategoryList from './CategoryList.svelte'

    export let children = []

    async function updateChildren (category) {
        // console.debug('[ChildCategories] updateChildren:', category)
        const results = await getChildren(category.id)
        children = sortByTitleCaseInsensitive(
            filter(isCategory, results)
        )
    }

    onMount(() => {
        messages.on('categorySelection', updateChildren)
    })

    onDestroy(() => {
        messages.off('categorySelection', updateChildren)
    })
</script>

<ul class="menu" tabindex="-1"
    on:categorySelection={updateChildren}
    >
    <CategoryList categories={children} />
</ul>
