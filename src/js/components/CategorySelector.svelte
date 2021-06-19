<script>
    import { equals, prop } from 'rambda'
    import { onDestroy, onMount } from 'svelte'

    import { dropdownShown } from '../stores/dropdown'
    import { categorySelection as selection } from '../stores/categorySelection'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'

    import Button from './Button.svelte'
    import CategorySearch from './CategorySearch.svelte'
    import ChildCategories from './ChildCategories.svelte'
    import Dropdown from './Dropdown.svelte'
    import Icon from './Icon.svelte'
    import IconFa from './IconFa.svelte'
    import InputGroup from './form/InputGroup.svelte'
    import RecentCategories from './RecentCategories.svelte'
    import SearchResults from './SearchResults.svelte'

    export let lastSearch = null
    export let lastSelection = null
    export let search = ''
    export let searchResults = []

    const isVisible = (dropdown) => equals($dropdownShown, dropdown)

    $: hasSelection = () => {
        // console.debug('hasSelection:', $selection)
        return prop('id', $selection)
    }

    const init = () => {
        lastSearch = null
        $dropdownShown = null
    }

    const clearSelection = (event) => {
        init()
        selection.reset()
    }

    const updateCategories = (results) => {
        // console.debug('[CategorySelector] updateCategories:', results.length)
        searchResults = results
        lastSearch = search.value
        $dropdownShown = 'search'
    }

    export const onSelection = (value) => {
        $selection = value
        lastSelection = value
        // console.debug('[CategorySelector] selection:', value, $selection)
        messages.emit('categorySelection', $selection)
        $dropdownShown = null
        return false
    }

    const onSearchFocus = (event) => {
        $dropdownShown = 'search'
        // console.debug('Search focused')
        return false
    }

    const toggleDropdown = (dropdown) => {
        if (isVisible(dropdown)) {
            $dropdownShown = null
        }
        else {
            $dropdownShown = dropdown
        }
        // console.debug('[CategorySelector] toggleDropdown:', $dropdownShown)
    }

    export const onToggle = (dropdown) => {
        return () => {
            toggleDropdown(dropdown)
            return false
        }
    }

    onMount(() => {
        messages.on('categorySelected', onSelection)
        messages.on('searchResults', updateCategories)
        messages.on('search:clear', clearSelection)
        messages.on('button:toggleChildren', onToggle('children'))
        messages.on('button:toggleSubcategory', onToggle('subcategory'))
        messages.on('button:toggleRecent', onToggle('recent'))

        init()
    })

    onDestroy(() => {
        messages.off('categorySelected', onSelection)
    })
</script>

<style lang="scss">
    .status .label {
        margin-bottom: 0.2rem;
    }

    .subcategory {
        display: none;
    }

    .subcategory.active {
        display: block;
    }
</style>

<div class="form-group">
    <label for="category" class="clearfix">
        { t('category') }
        <small class="status float-right">
            {#if isVisible('search') && lastSearch }
                <span class="label" title="{ t('search') }">
                    <Icon icon="search" />
                    { lastSearch }
                </span>
            {/if}
            {#if hasSelection() }
                <span class="label label-primary" title="{ t('selected') }">
                    <Icon icon="check" />
                    { lastSelection.title }
                </span>
            {/if}
        </small>
    </label>
    <div class="input-group category-search"
         on:categorySelected={ onSelection }>
        <CategorySearch
            name="search"
            bind:this={ search }
            bind:value={ $selection.title }
            on:focus={ onSearchFocus }
            />
        <input name="category" type="hidden" bind:value={ $selection.id }>
        {#if hasSelection() }
            <Button name="toggleChildren" classes="input-group-btn"
                    title={ t('subcategories') }>
                <IconFa icon="sitemap" />
            </Button>
            <Button name="toggleSubcategory" classes="input-group-btn"
                    title={ t('add_subcategory') }>
                <Icon icon="plus" />
            </Button>
        {/if}
        <Button name="toggleRecent" classes="input-group-btn"
                title={ t('recent_categories') }>
            <IconFa icon="history" />
        </Button>
    </div>

    <Dropdown name={'search'}>
        {#if isVisible('search') && lastSearch }
        <SearchResults categories={searchResults} />
        {/if}
    </Dropdown>

    <Dropdown name={'children'}>
        <ChildCategories />
    </Dropdown>

    <Dropdown name={'recent'}>
        <RecentCategories />
    </Dropdown>
</div>

<div class="form-group subcategory"
     class:active={ $dropdownShown === 'subcategory' }
     class:d-hide={ $dropdownShown !== 'subcategory' }
     >
    <InputGroup name="subcategory"
                label={ t('add_subcategory') }>
        <Button name="toggleSubcategory" classes="input-group-btn">
            <Icon icon="cross" />
        </Button>
    </InputGroup>
</div>
