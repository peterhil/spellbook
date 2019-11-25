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
      <button class="toggle-children btn btn-primary input-group-btn"
         if="{ hasSelection() }" tabindex="0">
        <i class="icon icon-minus"></i>
      </button>
      <button class="toggle-subcategory btn btn-primary input-group-btn"
         if="{ hasSelection() }" tabindex="0">
        <i class="icon icon-plus"></i>
      </button>
      <button class="toggle-recent btn btn-primary input-group-btn" tabindex="0">
        <i class="icon icon-caret"></i>
      </button>
    </div>

    <div class="categories dropdown { active: isVisible('search') }">
      <ul class="menu" aria-role="menu" tabindex="-1" if="{ categoriesFound() }">
        <li
          class="menu-item" each="{ category in categories }"
          data-is="sp-category" category="{ category }"
          >
        </li>
        <li class="divider" data-content="{ t('root_categories') }"></li>
        <sp-main-categories></sp-main-categories>
      </ul>
      <small if="{ isVisible('search') && isSearchActive() && noCategoryResults() }">
        No categories found
      </small>
    </div>

    <div class="form-group">
      <sp-child-categories category="{ selection }" class="categories dropdown { active: isVisible('children') }"></sp-child-categories>
      <sp-recent-categories class="categories dropdown { active: isVisible('recent') }"></sp-recent-categories>
    </div>
  </div>

  <div class="form-group" if="{ isVisible('subcategory') }">
    <label for="subcategory">{ t('add_subcategory') }</label>
    <div class="input-group subcategory">
      <input name="subcategory" ref="subcategory" class="form-input" autocomplete="off">
      <button class="toggle-subcategory btn btn-primary input-group-btn" tabindex="0">
        <i class="icon icon-cross"></i>
      </button>
    </div>
  </div>

  <script>
    import $ from 'zepto'
    import { empty, get, not, sortBy } from 'fkit'
    import { propertyCompare } from '../lib/pure'
    import { inputEvent$ } from '../lib/reactive'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { bookmarkSearch, filterCategories } from '../platform/common/bookmarks.js'
    import './sp-category.tag'
    import './sp-child-categories.tag'
    import './sp-main-categories.tag'
    import '../tag/sp-recent-categories.tag'

    const emptySelection = { title: null, id: null, parentId: null }
    const vm = this

    vm.categories = []
    vm.lastSearch = null
    vm.showDropdown = null
    vm.selection = emptySelection
    vm.t = t

    vm.isSearchActive = () => {
      return vm.lastSearch
    }

    vm.isVisible = (dropdown) => {
      return vm.showDropdown === dropdown
    }

    vm.categoriesFound = () => {
      return not(empty(vm.categories))
    }

    vm.hasSelection = () => {
      return get('id', vm.selection)
    }

    vm.noCategoryResults = () => {
      return empty(vm.categories)
    }

    vm.getLastSearch = () => {
      return vm.lastSearch
    }

    const init = () => {
      vm.categories = []
      vm.lastSearch = null
      vm.selection = emptySelection
      vm.showDropdown = null
      vm.refs.search.focus()
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
      messages.trigger('categorySelection', selection)

      vm.showDropdown = null
      vm.update()
      return false
    }

    const onKeydown = (event) => {
      const keys = { ENTER: 13 }

      if (keys.ENTER === event.keyCode) {
        return onSelection(event)
      }
    }

    const onSearchFocus = (event) => {
      vm.showDropdown = 'search'
      vm.update()
      return false
    }

    const onSearchBlur = (event) => {
      if (vm.showDropdown === 'search') {
        vm.showDropdown = null
      }
      return false
    }

    const toggleDropdown = (dropdown) => {
      if (vm.isVisible(dropdown)) {
        vm.showDropdown = null
      } else {
        vm.showDropdown = dropdown
      }
    }

    const onToggleChildren = () => {
      toggleDropdown('children')
      vm.update()
      return false
    }

    const onToggleSubcategory = () => {
      toggleDropdown('subcategory')
      vm.update()
      return false
    }

    const onToggleRecent = () => {
      toggleDropdown('recent')
      vm.update()
      return false
    }

    const addEvents = () => {
      $('.categories').on('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(document.body).on('click', '.toggle-children', onToggleChildren)
      $(document.body).on('click', '.toggle-subcategory', onToggleSubcategory)
      $(document.body).on('click', '.toggle-recent', onToggleRecent)
      $(vm.refs.search).on('focus', onSearchFocus)
      $(vm.refs.search).on('blur', onSearchBlur)
    }

    const removeEvents = () => {
      $('.categories').off('click', '.category', onSelection)
      $('.categories').off('keydown', '.category', onKeydown)
      $(document.body).off('click', '.toggle-children', onToggleChildren)
      $(document.body).off('click', '.toggle-subcategory', onToggleSubcategory)
      $(document.body).off('click', '.toggle-recent', onToggleRecent)
      $(vm.refs.search).off('focus', onSearchFocus)
      $(vm.refs.search).off('blur', onSearchBlur)
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search, { minLength: 1 })
        .flatMapLatest(query => bookmarkSearch({ query }))  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)
        .map(sortBy(propertyCompare('title', true)))

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
