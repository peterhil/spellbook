<script>
    import { getParentPath } from '../api/categories.js'
    import { t } from '../lib/translate'

    export let bookmark

    const getPath = async function () {
        path = await getParentPath(bookmark)
    }

    $: path = getPath(bookmark)
</script>

<style>
    .parents {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<small class="parents">
{#if path.length > 0 }
    { path }
{:else}
    { t('root_category') }
{/if}
</small>
