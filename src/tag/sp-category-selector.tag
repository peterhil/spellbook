<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-category-selector>

  <label for="category">{ t('category') }</label>
  <div class="input-group category-search">
    <input name="search" ref="search" class="form-input" type="text" value={selection.title} placeholder={ t('search_placeholder') }>
    <input name="category" required type="hidden" value={selection.id}>
    <a class="clear-search btn btn-primary input-group-btn">
      <i class="icon icon-search" if="{!selection.id}"></i>
      <i class="icon icon-cross" if="{selection.id}"></i>
    </a>
  </div>

  <div class="{categories: true, dropdown: true, active: isDropdownVisible()}">
    <ul class="menu" aria-role="menu">
      <li class="menu-item" each="{categories}">
        <a class="category" data-id={id} data-title={title} data-parent-id={parentId} tabindex="0">
          <div>{title}</div>
          <sp-bookmark-path bookmark={ asBookmark(id, title, parentId) }></sp-bookmark-path>
        </a>
      </li>

      <li class="divider" data-content="{ t('root_categories') }"></li>

      <li class="menu-item">
        <a class="category" data-id="{ bookmarksBarCategoryId }" data-title="Bookmarks Bar" tabindex="0">
          { t('bookmarks_bar') }
        </a>
      </li>
      <li class="menu-item">
        <a class="category" data-id="{ otherCategoryId }" data-title="Other Bookmarks" tabindex="0">
          { t('other_bookmarks') }
        </a>
      </li>
    </ul>
  </div>

  <small if="{ noCategoryResults() }">
    No categories found
  </small>

  <style>
    .categories {
      display: contents;
    }

    .categories .menu {
      max-height: 9.6rem;
      overflow-y: scroll;
    }

    .dropdown.active .menu,
    .dropdown .dropdown-toggle:focus + .menu,
    .dropdown .menu:hover {
      display: block;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  </style>

  <script>
    import $ from 'zepto'
    import './sp-bookmark-path.tag'
    import F from 'fkit'
    import { bookmarkSearch, filterCategories, bookmarksBarCategoryId, otherCategoryId } from '../platform/common/bookmarks.js'
    import { propertyCompare } from '../lib/pure'
    import { inputEvent$ } from '../lib/reactive'
    import { t } from '../lib/translate'
    const vm = this
    var $dropdown = $('.categories .dropdown')

    vm.bookmarksBarCategoryId = bookmarksBarCategoryId
    vm.otherCategoryId = otherCategoryId
    vm.selection = { title: null, id: null, parentId: null }
    vm.t = t

    vm.isSearchActive = () => {
      return !F.empty(vm.refs.search.value)
    }

    vm.isDropdownVisible = () => {
      return vm.isSearchActive() && !F.empty(vm.categories) && !F.get('id', vm.selection)
    }

    vm.noCategoryResults = () => {
      return vm.isSearchActive() && F.empty(vm.categories)
    }

    vm.asBookmark = (id, title, parentId) => {
      return { id, title, parentId }
    }

    const init = () => {
      vm.categories = []
      vm.selection = {
        title: null,
        id: null,
        parentId: null,
      }
      vm.refs.search.focus()
    }

    const clearSelection = (event) => {
      init()
      vm.update()
    }

    const onClearSelection = (event) => {
      clearSelection()
      event.preventDefault()
    }

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    const onSelection = (event) => {
      const selection = { ...event.currentTarget.dataset }
      console.debug('Category selection:', selection.id, selection.title, selection.parentId)

      vm.selection = {
        id: selection.id,
        title: selection.title,
        parentId: selection.parentId,
      }

      $dropdown.removeClass('active')
      vm.update()
      event.preventDefault()
    }

    const onKeydown = (event) => {
      const keys = { ENTER: 13 }

      if (keys.ENTER === event.keyCode) {
        return onSelection(event)
      }
    }

    const renewSearch = (event) => {
      if (!vm.selection.id) {
        return false
      }
      onClearSelection(event)
    }

    const addEvents = () => {
      $('.categories').on('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).on('focus', renewSearch)
      $('.category-search').on('click', '.clear-search', onClearSelection)
    }

    const removeEvents = () => {
      $('.categories').off('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).off('focus', renewSearch)
      $('.category-search').off('click', '.clear-search', onClearSelection)
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search, { minLength: 1 })
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)
        .map(F.sortBy(propertyCompare('title', false)))

      categorySearch$
        .observe(updateCategories, console.error)

      const emptySearch$ = inputEvent$(vm.refs.search, { minLength: 0 })
        .filter(search => search.length <= 1)

      emptySearch$
        .observe(clearSelection, console.error)

      init()
      addEvents()
    })

    vm.on('unmount', removeEvents)
  </script>

</sp-category-selector>
