<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-category-selector>

  <div class="form-group">
    <label for="category">{ t('category') }</label>
    <small if="{ !!lastSearch }" class="float-right">{ t('search') }: { lastSearch }</small>

    <div class="input-group category-search">
      <input name="search" ref="search" required
             class="form-input"
             type="text"
             value="{ selection.title }"
             placeholder="{ t('search_placeholder') }"
             autocomplete="off">
      <input name="category" type="hidden" value={ selection.id }>
      <a class="btn btn-primary input-group-btn">
        <i class="icon icon-plus"></i>
      </a>
    </div>

    <div class="{categories: true, dropdown: true, active: isDropdownVisible()}">
      <ul class="menu" aria-role="menu" tabindex="-1">
        <li
          class="menu-item" each="{ category in categories }"
          data-is="sp-category" category="{ category }"
          >
        </li>
        <li class="divider" data-content="{ t('root_categories') }"></li>
        <sp-main-categories></sp-main-categories>
      </ul>
    </div>

    <sp-bookmark-path bookmark={ selection }></sp-bookmark-path>

    <small if="{ noCategoryResults() }">
      No categories found
    </small>
  </div>

  <div class="form-group">
    <label for="subcategory">{ t('add_subcategory') }</label>
    <div class="input-group subcategory">
      <input name="subcategory" ref="subcategory" class="form-input" autocomplete="off">
      <a class="btn btn-primary input-group-btn">
        <i class="icon icon-cross"></i>
      </a>
    </div>
  </div>

  <style>
    .categories {
      display: contents;
    }

    .categories .menu {
      max-height: 9.6rem;
      overflow-y: scroll;
      overflow-x: hidden;
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
    import F from 'fkit'
    import { propertyCompare } from '../lib/pure'
    import { inputEvent$ } from '../lib/reactive'
    import { t } from '../lib/translate'
    import { bookmarkSearch, filterCategories } from '../platform/common/bookmarks.js'
    import './sp-bookmark-path.tag'
    import './sp-category.tag'
    const emptySelection = { title: null, id: null, parentId: null }
    const vm = this
    var $dropdown = $('.categories .dropdown')

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
      vm.showDropdown = false
    }

    const clearSelection = (event) => {
      init()
      vm.update()
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
    }

    const removeEvents = () => {
      $('.categories').off('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).off('focus', onSearchFocus)
      $(vm.refs.search).off('blur', onSearchBlur)
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search, { minLength: 1 })
        .flatMapLatest(query => bookmarkSearch({ query }))  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)
        .map(F.sortBy(propertyCompare('title', false)))

      const emptySearch$ = inputEvent$(vm.refs.search, { minLength: 0 })
        .filter(search => search.length <= 1)

      categorySearch$.observe(updateCategories, console.error)
      emptySearch$.observe(clearSelection, console.error)
      init()
      addEvents()
    })

    vm.on('unmount', removeEvents)
  </script>

</sp-category-selector>
