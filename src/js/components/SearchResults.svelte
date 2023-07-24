<script>
    import { isEmpty, not } from 'rambda'
    import { t } from '../lib/translate'
    import CategoryMenu from './CategoryMenu.svelte'
    import MainCategories from './MainCategories.svelte'

    export let categories = []
</script>

<ul class="menu" tabindex="-1">
    <small class="toast">
        { t('search_results') }
        ({ categories.length } { t('results') })
    </small>
    {#if not(isEmpty(categories)) }
        <CategoryMenu categories={categories} />
        <li class="divider" data-content={ t('root_categories') }></li>
        <MainCategories />
    {/if}
</ul>
