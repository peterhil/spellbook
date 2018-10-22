<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-category-selector>

  <div class="form-group">
    <label for="category">Category</label>
    <div class="input-group category-search">
      <input name="search" ref="search" class="form-input" type="text" value={selection.title} placeholder="Search by typing">
      <a if="{!selection.title}" class="btn btn-primary input-group-btn">
        <i class="icon icon-search"></i>
      </a>
      <a if={selection.title} class="clear-search btn btn-primary input-group-btn">
        <i class="icon icon-cross"></i>
      </a>
    </div>

    <div class="categories">
      <div class="{active: isDropdownVisible(), dropdown: true, category-dropdown: true}">
        <ul class="menu" aria-role="menu">
          <li class="menu-item" each="{categories}">
            <a class="category" data-id={id} data-title={title} tabindex="0">{title}</a>
          </li>

          <li class="divider" data-content="root categories">

          <li class="menu-item">
            <a class="category" data-id="1" data-title="Bookmarks Bar" tabindex="0">
              Bookmarks Bar
            </a>
          </li>
          <li class="menu-item">
            <a class="category" data-id="2" data-title="Other Bookmarks" tabindex="0">
              Other Bookmarks
            </a>
          </li>
        </ul>
      </div>
      <span if={selection.id} class="form-group">
        <input name="categoryTitle" type="hidden" value={selection.title} class="form-input">
        <input name="category" type="hidden" value={selection.id} class="form-input">
      </span>
    </div>
  </div>


  <style>
    .categories .menu {
      max-height: 9.6rem;
      overflow-y: scroll;
    }

    .dropdown .menu {
      width: 100%;
      max-height: 9.6rem;
    }

    .dropdown.active .menu,
    .dropdown .dropdown-toggle:focus + .menu,
    .dropdown .menu:hover {
      display: block;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .input-group-addon.with-icon {
      padding: 0.15rem;
    }

    .with-icon .icon {
      vertical-align: text-top;
      height: 1rem;
      width: 1rem;
    }
  </style>

  <script>
    import { bookmarkSearch, filterCategories } from '../lib/chrome/bookmarks.js'
    import { inputEvent$ } from '../lib/util'
    import $ from 'zepto'
    const vm = this
    var $dropdown = $('.category-dropdown')

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    const onSelection = (event) => {
      const selection = { ...event.target.dataset }
      console.debug('Category selection:', selection, selection.id, selection.title)

      vm.selection = {
        id: selection.id,
        title: selection.title,
      }

      $dropdown.removeClass('active')
      vm.update()
      event.preventDefault()
    }

    const init = () => {
      vm.categories = []
      vm.selection = {}
      vm.refs.search.focus()
    }
    const clearSelection = (event) => {
      init()
      vm.update()
      event.preventDefault()
    }

    vm.isDropdownVisible = () => {
      return vm.categories.length > 0 && !vm.selection.id
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search)
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)

      categorySearch$
        .observe(updateCategories, console.error)

      init()

      $('.categories').on('click', '.category', onSelection)
      $('.category-search').on('click', '.clear-search', clearSelection)
    })

    vm.on('unmount', () => {
      $('.category-dropdown').off('click', '.category', onSelection)
      $('.category-search').off('click', '.clear-search', clearSelection)
    })
  </script>

</popup-category-selector>
