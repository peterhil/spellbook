<script>
    import { isEmpty, not } from 'rambda'
    import { t } from '../lib/translate'
    import CategoryList from './CategoryList.svelte'
    import MainCategories from './MainCategories.svelte'

    export let categories = []
</script>

{#if not(isEmpty(categories)) }
    <ul class="menu" tabindex="-1">
        <CategoryList categories={categories} />
        <li class="divider" data-content={ t('root_categories') }></li>
        <MainCategories />
    </ul>
{:else}
    <small>No categories found</small>
{/if}
