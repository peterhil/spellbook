<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-directory>
  <div class="view">
    <sp-directory-header></sp-directory-header>

    <div class="directory">
      <div class="panel left-pane">
        <div class="panel-header">
          <div class="panel-title">{ t('categories') }</div>
        </div>
        <div class="panel-body" tabindex="-1">
          <ul class="menu" aria-role="menu" tabindex="-1">
            <sp-main-categories></sp-main-categories>
            <li class="divider"></li>
            <sp-category-list categories={ categories }></sp-category-list>
          </ul>
        </div>
      </div>

      <div class="panel right-pane">
        <div class="panel-header">
          <div class="panel-title">{ t('bookmarks') }</div>
        </div>
        <div class="panel-body" tabindex="-1">
          <ul class="menu" aria-role="menu" tabindex="-1">
            <li class="divider" if={ hasItems(subcategories) } data-content={ t('subcategories') }></li>
            <li
              class="menu-item" each={ category in subcategories }
              data-is="sp-category" category={ category }
            >
            </li>
            <li class="divider" if={ hasItems(bookmarks) } data-content={ t('bookmarks') }></li>
            <li
              class="menu-item" each={ bookmark in bookmarks }
              data-is="sp-bookmark" bookmark={ bookmark }
            >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

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
      overflow: scroll;
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

    .menu,
    .panel {
      &:focus {
        outline: none;
      }
    }

    .category .title {
      font-weight: bolder;
    }
  </style>

  <script>
    import { get, head, filter, sortBy } from 'fkit'
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
    import '../tag/sp-bookmark.tag'
    import '../tag/sp-category.tag'
    import '../tag/sp-category-list.tag'
    import '../tag/sp-main-categories.tag'
    import './sp-directory-header.tag'
    const vm = this

    vm.t = t
    vm.hasItems = hasItems
    vm.selectedCategory = bookmarksBarCategoryId

    const allBookmarks$ = Kefir
      .fromEvents(messages, 'allBookmarksTree')

    const categories$ = allBookmarks$
      .map(flattenTree)
      .map(filterCategories)
      .map(sortBy(propertyCompare('title', true)))
      .spy('Directory tag: categories$')

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
      console.debug('Categories updated')
    }

    const selectedBookmarks$ = Kefir
      .fromPromise(getSubTree(vm.selectedCategory))
      .map(head)  // TODO Fix this API madness on the bookmarks adapter!
      .map(get('children'))

    const bookmarks$ = selectedBookmarks$
      .map(sortBy(propertyCompare('title', true)))
      .spy('Directory tag: bookmarks$')

    const updateBookmarks = (bookmarks) => {
      console.debug('updateBookmarks:', bookmarks)
      vm.bookmarks = filter(isBookmark, bookmarks)
      vm.subcategories = filter(isCategory, bookmarks)
      vm.update()
      console.debug('Bookmarks updated')
    }

    vm.on('mount', () => {
      categories$.observe(updateCategories, console.error)
      bookmarks$.observe(updateBookmarks, console.error)
    })
  </script>
</sp-directory>
