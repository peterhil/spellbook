<script>
    import { fromEvents, fromPromise } from 'kefir'
    import { prop, head, filter } from 'rambda'
    import { browser } from 'rosegarden'
    import { onMount } from 'svelte'

    import { bookmarksBarCategoryId, flattenTree } from '../api/categories.js'
    import { isBookmark, isCategory } from '../api/helpers.js'
    import { messages } from '../lib/messaging'
    import { hasItems, sortByTitleCaseInsensitive } from '../lib/pure'
    import { t } from '../lib/translate'

    import Bookmark from './Bookmark.svelte'
    import Category from './Category.svelte'
    import CategoryList from './CategoryList.svelte'
    import DirectoryHeader from './DirectoryHeader.svelte'
    import MainCategories from './MainCategories.svelte'

    let bookmarks = []
    let categories = []
    let subcategories = []

    const selectedCategory = bookmarksBarCategoryId

    const allBookmarks$ = fromEvents(messages, 'allBookmarksTree')

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

    const selectedBookmarks$ = fromPromise(browser.bookmarks.getSubTree(selectedCategory))
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
