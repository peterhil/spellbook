<script>
  import { empty, get, not, sortBy } from 'fkit'
  import { onDestroy, onMount } from 'svelte'
  import { messages } from '../lib/messaging'
  import { filterBy, propertyCompare } from '../lib/pure'
  import { inputEvent$ } from '../lib/reactive'
  import {
    dropdownStore as showDropdown,
    emptySelection,
  } from '../lib/stores'
  import { t as translate } from '../lib/translate'
  import { bookmarkSearch } from '../api/bookmarks.js'
  import { isCategory } from '../api/helpers'
  import Button from './Button.svelte'
  import CategoryList from './CategoryList.svelte'
  import ChildCategories from './ChildCategories.svelte'
  import Icon from './Icon.svelte'
  import MainCategories from './MainCategories.svelte'
  import RecentCategories from './RecentCategories.svelte'
  import Dropdown from './Dropdown.svelte'

  export let lastSearch = null
  export let search = ''
  export let searchResults = []
  export let selection = emptySelection
  export let t = translate

  const isVisible = (dropdown) => {
    console.debug('isVisible:', dropdown, $showDropdown === dropdown)
    return $showDropdown === dropdown
  }

  $: categories = searchResults
  $: isSearchActive = isVisible('search') && lastSearch
  $: showSubcategory = isVisible('subcategory')
  $: hasSelection = () => {
    console.debug('hasSelection:', selection)
    return get('id', selection)
  }

  const init = () => {
    lastSearch = null
    selection = emptySelection
    $showDropdown = null
    search.focus()
  }

  const clearSelection = (event) => {
    init()
  }

  const updateCategories = (results) => {
    console.debug('updateCategories:', results)
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
    console.debug('Search focused')
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
    const categorySearch$ = inputEvent$(search, { minLength: 2 })
      .flatMapLatest(query => bookmarkSearch({ query })) // TODO See how RxJS.switchMap cancel the previous observable
      .map(filterBy(isCategory))
      .map(sortBy(propertyCompare('title', true)))

    const emptySearch$ = inputEvent$(search, { minLength: 0 })
      .filter(search => search.length <= 1)

    categorySearch$.observe(updateCategories, console.error)
    emptySearch$.observe(clearSelection, console.error)

    messages.on('categorySelected', onSelection)
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
    <input name="search" required
           class="form-input"
           bind:this={search}
           bind:value={selection.title}
           on:focus={onSearchFocus}
           placeholder={ t('search_placeholder') }
           autocomplete="off">
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
    {#if not(empty(searchResults)) }
    <ul class="menu" tabindex="-1">
      <CategoryList categories={searchResults} />
      <li class="divider" data-content={ t('root_categories') }></li>
      <MainCategories />
    </ul>
    {:else}
    <small>No categories found</small>
    {/if}
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
