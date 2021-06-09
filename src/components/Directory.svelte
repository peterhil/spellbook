<script>
    import { prop, head, filter } from 'rambda'
    import { onMount } from 'svelte'
    import Kefir from 'kefir'
    import { messages } from '../lib/messaging'
    import { hasItems, sortByTitleCaseInsensitive } from '../lib/pure'
    import { t } from '../lib/translate'
    import { isBookmark, isCategory } from '../api/helpers.js'
    import {
        bookmarksBarCategoryId,
        flattenTree,
        getSubTree,
    } from '../api/categories.js'
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
        .map(filter(isCategory))
        .map(sortByTitleCaseInsensitive)
        // .spy('[Directory] categories$')

    const updateCategories = (newCategories) => {
        // console.debug('[Directory] updateCategories:', newCategories)
        categories = newCategories
        // update()
        // console.debug('[Directory] categories updated')
    }

    const selectedBookmarks$ = Kefir.fromPromise(getSubTree(selectedCategory))
        .map(head) // TODO Fix this API madness on the bookmarks adapter!
        .map(prop('children'))

    const bookmarks$ = selectedBookmarks$
        .map(sortByTitleCaseInsensitive)
        // .spy('[Directory] bookmarks$')

    const updateBookmarks = (newBookmarks) => {
        // console.debug('[Directory] updateBookmarks:', newBookmarks)
        bookmarks = filter(isBookmark, newBookmarks)
        subcategories = filter(isCategory, newBookmarks)
        // vm.update()
        // console.debug('[Directory] bookmarks updated')
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
        top: var(--navbar-height);
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
    }

    .left-pane {
        flex: 25%;
        min-width: 240px;
        resize: horizontal;
    }

    .right-pane {
        flex: 75%;
        width: auto;
        max-width: 100%;
        overflow-x: hidden;
    }

    .panel {
        border: 0;
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
