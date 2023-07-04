<script>
    import { browser } from 'rosegarden'
    import { onMount } from 'svelte'

    import CategoryList from './CategoryList.svelte'

    let categories = []

    function update (tree) {
        categories = tree[0]?.children || []
    }

    onMount(() => {
        browser.bookmarks.getTree()
            .then(update)
    })
</script>

<CategoryList categories={categories} />
