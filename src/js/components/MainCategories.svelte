<script>
    import browser from 'webextension-polyfill'
    import { onMount } from 'svelte'

    import CategoryMenu from './CategoryMenu.svelte'

    let categories = []

    function update (tree) {
        categories = tree[0]?.children || []
    }

    onMount(() => {
        browser.bookmarks.getTree()
            .then(update)
    })
</script>

<CategoryMenu categories={categories} />
