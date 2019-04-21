<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-category-selector>

  <label for="category">{ t('category') }</label>
  <small if="{ !!lastSearch }" class="float-right">{ t('search') }: { lastSearch }</small>
  <div class="input-group category-search">
    <input name="search" ref="search" class="form-input" type="text" value={selection.title} placeholder={ t('search_placeholder') }>
    <input name="category" required type="hidden" value={selection.id}>
    <a class="clear-search btn btn-primary input-group-btn">
      <i class="icon icon-search" if="{ !lastSearch }"></i>
      <i class="icon icon-cross" if="{ lastSearch }"></i>
    </a>
  </div>

  <div class="{categories: true, dropdown: true, active: isDropdownVisible()}">
    <ul class="menu" aria-role="menu" tabindex="-1">
      <sp-category-list categories="{ categories }"></sp-category-list>

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

  <sp-bookmark-path bookmark={ selection }></sp-bookmark-path>

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
    .dropdown .dropdown-toggle:focus + .menu {
      display: block;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  </style>

  <script>
    import $ from 'zepto'
    import './sp-bookmark-path.tag'
    import './sp-category-list.tag'
    import F from 'fkit'
    import { bookmarkSearch, filterCategories, bookmarksBarCategoryId, otherCategoryId } from '../platform/common/bookmarks.js'
    import { propertyCompare } from '../lib/pure'
    import { inputEvent$ } from '../lib/reactive'
    import { t } from '../lib/translate'
    const vm = this
    const emptySelection = { title: null, id: null, parentId: null }
    var $dropdown = $('.categories .dropdown')

    vm.bookmarksBarCategoryId = bookmarksBarCategoryId
    vm.otherCategoryId = otherCategoryId
    vm.lastSearch = null
    vm.showDropdown = false
    vm.selection = emptySelection
    vm.t = t

    vm.isSearchActive = () => {
      return !F.empty(vm.refs.search.value)
    }

    vm.isDropdownVisible = () => {
      return vm.showDropdown || vm.isSearchActive() && vm.noSelection() && vm.categoriesFound()
    }

    vm.categoriesFound = () => {
      return !F.empty(vm.categories)
    }

    vm.noSelection = () => {
      return !F.get('id', vm.selection)
    }

    vm.noCategoryResults = () => {
      return vm.isSearchActive() && F.empty(vm.categories)
    }

    vm.getLastSearch = () => {
      return vm.lastSearch
    }

    const init = () => {
      vm.categories = []
      vm.selection = emptySelection
      vm.lastSearch = null
      vm.refs.search.focus()
    }

    const clearSelection = (event) => {
      init()
      vm.update()
    }

    const onClearSelection = (event) => {
      vm.showDropdown = false
      clearSelection()
      event.preventDefault()
    }

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.lastSearch = vm.refs.search.value
      vm.categories = categories
      vm.update()
    }

    const onSelection = (event) => {
      const selection = { ...event.currentTarget.dataset }
      console.debug('Category selection:', selection)

      vm.selection = selection

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

    const onSearchFocus = (event) => {
      if (!vm.selection.id) {
        return false
      } else {
        vm.showDropdown = true
      }
      vm.update()
      return false
    }

    const onSearchBlur = (event) => {
      vm.showDropdown = false
      return false
    }

    const addEvents = () => {
      $('.categories').on('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).on('focus', onSearchFocus)
      $(vm.refs.search).on('blur', onSearchBlur)
      $('.category-search').on('click', '.clear-search', onClearSelection)
    }

    const removeEvents = () => {
      $('.categories').off('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).off('focus', onSearchFocus)
      $(vm.refs.search).off('blur', onSearchBlur)
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
