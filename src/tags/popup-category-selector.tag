<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-category-selector class="form-group">

  <label for="category">Category</label>
  <div class="input-group category-search">
    <input name="search" ref="search" class="form-input" type="text" value={selection.title} placeholder="Search by typing">
    <input name="category" required type="hidden" value={selection.id}>
    <a class="clear-search btn btn-primary input-group-btn">
      <i class="icon icon-search" if="{!selection.id}"></i>
      <i class="icon icon-cross" if="{selection.id}"></i>
    </a>
  </div>

  <div class="{categories: true, dropdown: true, active: isDropdownVisible()}">
    <ul class="menu" aria-role="menu">
      <li class="menu-item" each="{categories}">
        <a class="category" data-id={id} data-title={title} tabindex="0">{title}</a>
      </li>

      <li class="divider" data-content="root categories"></li>

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

  <style>
    .categories {
      display: contents;
    }

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
    var $dropdown = $('.categories .dropdown')

    vm.selection = {
      title: null,
      id: null,
    }

    vm.isDropdownVisible = () => {
      return (vm.categories && vm.categories.length > 0) &&
             (vm.selection && !vm.selection.id)
    }

    const init = () => {
      vm.categories = []
      vm.selection = {
        title: null,
        id: null,
      }
      vm.refs.search.focus()
    }

    const clearSelection = (event) => {
      init()
      vm.update()
      event.preventDefault()
    }

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
      clearSelection(event)
    }

    const addEvents = () => {
      $('.categories').on('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).on('focus', renewSearch)
      $('.category-search').on('click', '.clear-search', clearSelection)
    }

    const removeEvents = () => {
      $('.categories').off('click', '.category', onSelection)
      $('.categories').on('keydown', '.category', onKeydown)
      $(vm.refs.search).off('focus', renewSearch)
      $('.category-search').off('click', '.clear-search', clearSelection)
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search)
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)

      categorySearch$
        .observe(updateCategories, console.error)

      init()
      addEvents()
    })

    vm.on('unmount', removeEvents)
  </script>

</popup-category-selector>
