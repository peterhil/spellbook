<script>
  import { empty, get, not, sortBy } from 'fkit'
  import { onDestroy, onMount } from 'svelte'
  import { messages } from '../lib/messaging'
  import { propertyCompare } from '../lib/pure'
  import { inputEvent$ } from '../lib/reactive'
  import {
    dropdownStore as showDropdown,
    emptySelection,
  } from '../lib/stores'
  import { t as translate } from '../lib/translate'
  import { bookmarkSearch, filterCategories } from '../platform/common/bookmarks.js'
  import CategoryList from './CategoryList.svelte'
  import ChildCategories from './ChildCategories.svelte'
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
    messages.trigger('categorySelection', selection)
    $showDropdown = null
    return false
  }

  const onSearchFocus = (event) => {
    $showDropdown = 'search'
    console.debug('Search focused')
    return false
  }

  const onSearchBlur = (event) => {
    if (isVisible('search')) {
      $showDropdown = null
    }
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
    const categorySearch$ = inputEvent$(search, { minLength: 1 })
      .flatMapLatest(query => bookmarkSearch({ query })) // TODO See how RxJS.switchMap cancel the previous observable
      .map(filterCategories)
      .map(sortBy(propertyCompare('title', true)))

    const emptySearch$ = inputEvent$(search, { minLength: 0 })
      .filter(search => search.length <= 1)

    categorySearch$.observe(updateCategories, console.error)
    emptySearch$.observe(clearSelection, console.error)
    messages.on('categorySelected', onSelection)
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
           on:blur={onSearchBlur}
           on:focus={onSearchFocus}
           placeholder={ t('search_placeholder') }
           autocomplete="off">
    <input name="category" type="hidden" bind:value={selection.id}>
    {#if hasSelection() }
    <button class="toggle-children btn btn-primary input-group-btn" tabindex="0"
            on:click|preventDefault={onToggle('children')}>
      <i class="icon icon-minus"></i>
    </button>
    <button class="toggle-subcategory btn btn-primary input-group-btn" tabindex="0"
            on:click|preventDefault={onToggle('subcategory')}>
      <i class="icon icon-plus"></i>
    </button>
    {/if}
    <button class="toggle-recent btn btn-primary input-group-btn" tabindex="0"
            on:click|preventDefault={onToggle('recent')}>
      <i class="icon icon-caret"></i>
    </button>
  </div>

  <Dropdown name={'search'}>
    {#if not(empty(searchResults)) }
    <ul class="menu" tabindex="-1">
      <CategoryList categories={searchResults} />
      <li class="divider" data-content={ t('root_categories') }></li>
      <MainCategories />
    </ul>
    {/if}

    {#if empty(searchResults) && isVisible('search') && lastSearch }
    <small>No categories found</small>
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
    <button class="toggle-subcategory btn btn-primary input-group-btn" tabindex="0"
            on:click={onToggle('subcategory')}>
      <i class="icon icon-cross"></i>
    </button>
  </div>
</div>
