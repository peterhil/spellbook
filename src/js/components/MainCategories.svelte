<script>
    import { onMount } from 'svelte'
    import { getTree } from '../api/categories.js'
    import CategoryList from './CategoryList.svelte'

    let categories = []

    function update (tree) {
        categories = tree[0]?.children || []
    }

    onMount(() => {
        getTree()
            .then(update)
    })
</script>

<CategoryList categories={categories} />
