<script>
    import { getParentPath } from '../api/categories.js'
    import { t } from '../lib/translate'

    let { bookmark } = $props();

    async function getPath (bookmark) {
        const path = await getParentPath(bookmark)

        return path || t('root_category')
    }
</script>

<small class="parents">
    {#await getPath(bookmark)}
        <span class="loading">Loading...</span>
    {:then path}
        { path }
    {/await}
</small>
