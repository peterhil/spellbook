<script>
    import browser from 'webextension-polyfill'
    import { filter } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import { isCategory } from '../api/helpers'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { sortByTitleCaseInsensitive } from '../lib/pure'
    import CategoryMenu from './CategoryMenu.svelte'

    export let children = []

    async function updateChildren (category) {
        // console.debug('[ChildCategories] updateChildren:', category)
        const results = await browser.bookmarks.getChildren(category.id)
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
    on:categorySelection={updateChildren}>
    <small class="toast">
        { t('subcategories') }
        ({ children.length } { t('pieces') })
    </small>
    <CategoryMenu categories={children} />
</ul>
