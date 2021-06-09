<script>
    import { prop } from 'rambda'
    import { messages } from '../lib/messaging'
    import { onDestroy, onMount } from 'svelte'
    import {
        dropdownStore as showDropdown,
        emptySelection,
    } from '../lib/stores'
    import { t } from '../lib/translate'
    import Button from './Button.svelte'
    import CategorySearch from './CategorySearch.svelte'
    import ChildCategories from './ChildCategories.svelte'
    import Dropdown from './Dropdown.svelte'
    import Icon from './Icon.svelte'
    import RecentCategories from './RecentCategories.svelte'
    import SearchResults from './SearchResults.svelte'

    export let lastSearch = null
    export let search = ''
    export let searchResults = []
    export let selection = emptySelection

    const isVisible = (dropdown) => {
        // console.debug('isVisible:', dropdown, $showDropdown === dropdown)
        return $showDropdown === dropdown
    }

    $: categories = searchResults
    $: isSearchActive = isVisible('search') && lastSearch
    $: showSubcategory = isVisible('subcategory')
    $: hasSelection = () => {
        // console.debug('hasSelection:', selection)
        return prop('id', selection)
    }

    const init = () => {
        lastSearch = null
        selection = emptySelection
        $showDropdown = null
    }

    const clearSelection = (event) => {
        init()
    }

    const updateCategories = (results) => {
        // console.debug('updateCategories:', results)
        searchResults = results
        lastSearch = search.value
        $showDropdown = 'search'
    }

    export const onSelection = (value) => {
        selection = value
        console.debug('Category selection:', value, selection)
        messages.emit('categorySelection', selection)
        $showDropdown = null
        return false
    }

    const onSearchFocus = (event) => {
        $showDropdown = 'search'
        // console.debug('Search focused')
        return false
    }

    const toggleDropdown = (dropdown) => {
        if (isVisible(dropdown)) {
            $showDropdown = null
        } else {
            $showDropdown = dropdown
        }
        console.debug('toggleDropdown:', $showDropdown)
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

<style>
    .subcategory {
        display: none
    }

    .subcategory.active {
        display: block
    }
</style>

<div class="form-group">
    <label for="category">{ t('category') }</label>
    {#if isVisible('search') && lastSearch }
    <small class="float-right">{ t('search') }: { lastSearch }</small>
    {/if}

    <div class="input-group category-search"
         on:categorySelected={onSelection}>
        <CategorySearch
            name="search"
            bind:this={search}
            bind:value={selection.title}
            on:focus={onSearchFocus}
            />
        <input name="category" type="hidden" bind:value={selection.id}>
        {#if hasSelection() }
        <Button name="toggleChildren" classes="input-group-btn">
            <Icon icon="minus" />
        </Button>
        <Button name="toggleSubcategory" classes="input-group-btn">
            <Icon icon="plus" />
        </Button>
        {/if}
        <Button name="toggleRecent" classes="input-group-btn">
            <Icon icon="caret" />
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

<div class="form-group subcategory" class:active={$showDropdown === 'subcategory'}>
    <label for="subcategory">{ t('add_subcategory') }</label>
    <div class="input-group">
        <input name="subcategory" class="form-input" autocomplete="off">
        <Button name="toggleSubcategory" classes="input-group-btn">
            <Icon icon="cross" />
        </Button>
    </div>
</div>
