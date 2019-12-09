<script>
  import { get, head, filter, sortBy } from 'fkit'
  import { onMount } from 'svelte'
  import Kefir from 'kefir'
  import { messages } from '../lib/messaging'
  import { hasItems, propertyCompare } from '../lib/pure'
  import { t } from '../lib/translate'
  import {
    bookmarksBarCategoryId,
    filterCategories,
    flattenTree,
    getSubTree,
    isBookmark,
    isCategory,
  } from '../platform/common/bookmarks.js'
  import Bookmark from './Bookmark.svelte'
  import Category from './Category.svelte'
  import CategoryList from './CategoryList.svelte'
  import DirectoryHeader from './DirectoryHeader.svelte'
  import MainCategories from './MainCategories.svelte'

  let bookmarks = []
  let categories = []
  let subcategories = []

  const selectedCategory = bookmarksBarCategoryId

  const allBookmarks$ = Kefir
    .fromEvents(messages, 'allBookmarksTree')

  const categories$ = allBookmarks$
    .map(flattenTree)
    .map(filterCategories)
    .map(sortBy(propertyCompare('title', true)))
    .spy('Directory tag: categories$')

  const updateCategories = (newCategories) => {
    console.debug('updateCategories:', newCategories)
    categories = newCategories
    // update()
    console.debug('Categories updated')
  }

  const selectedBookmarks$ = Kefir.fromPromise(getSubTree(selectedCategory))
    .map(head) // TODO Fix this API madness on the bookmarks adapter!
    .map(get('children'))

  const bookmarks$ = selectedBookmarks$
    .map(sortBy(propertyCompare('title', true)))
    .spy('Directory tag: bookmarks$')

  const updateBookmarks = (newBookmarks) => {
    console.debug('updateBookmarks:', newBookmarks)
    bookmarks = filter(isBookmark, newBookmarks)
    subcategories = filter(isCategory, newBookmarks)
    // vm.update()
    console.debug('Bookmarks updated')
  }

  onMount(() => {
    categories$.observe(updateCategories, console.error)
    bookmarks$.observe(updateBookmarks, console.error)
  })
</script>

<style>
  .view {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .directory {
    position: absolute;
    display: flex;
    top: var(--navbar-height);
    bottom: 0;
    left: 0;
    right: 0;
  }

  .left-pane {
    resize: horizontal;
    flex: 25%;
    min-width: 240px;
  }

  .right-pane {
    width: auto;
    flex: 75%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .panel {
    border: none;
    border-radius: 0;
  }

  .panel-header {
    background-color: #333;
  }

  .panel-title {
    color: #eee;
  }

  .panel .panel-body {
    padding: 0 .4rem;
  }

  .panel .menu {
    padding: 0;
    box-shadow: none;
  }

  .menu:focus,
  .panel:focus {
    outline: none;
  }
</style>

<div class="view">
  <DirectoryHeader></DirectoryHeader>

  <div class="directory">
    <div class="panel left-pane">
      <div class="panel-header">
        <div class="panel-title">{ t('categories') }</div>
      </div>
      <div class="panel-body" tabindex="-1">
        <ul class="menu" tabindex="-1">
          <MainCategories />
          <li class="divider"></li>
          <CategoryList categories={categories} />
        </ul>
      </div>
    </div>

    <div class="panel right-pane">
      <div class="panel-header">
        <div class="panel-title">{ t('bookmarks') }</div>
      </div>
      <div class="panel-body" tabindex="-1">
        <ul class="menu" tabindex="-1">
          {#if hasItems(subcategories) }
          <li class="divider" data-content={ t('subcategories') }></li>
          {/if}
          {#each subcategories as category }
          <li class="menu-item">
            <Category category={category} />
          </li>
          {/each}
          {#if hasItems(bookmarks) }
          <li class="divider"  data-content={ t('bookmarks') }></li>
          {/if}
          {#each bookmarks as bookmark }
          <li class="menu-item">
            <Bookmark bookmark={ bookmark } />
          </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
