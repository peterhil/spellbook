<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-category-selector>

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
        <a class="category" data-id={id} data-title={title} data-parent-id={parentId} tabindex="0">
          <div>{title}</div>
          <bookmark-path bookmark={ asBookmark(id, title, parentId) }></bookmark-path>
        </a>
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
    import './bookmark-path.tag'
    import $ from 'zepto'
    import F from 'fkit'
    import { bookmarkSearch, filterCategories } from '../lib/chrome/bookmarks.js'
    import { inputEvent$, propertyCompare } from '../lib/util'
    const vm = this
    var $dropdown = $('.categories .dropdown')

    vm.selection = {
      title: null,
      id: null,
      parentId: null,
    }

    vm.isDropdownVisible = () => {
      return (vm.categories && vm.categories.length > 0) &&
             (vm.selection && !vm.selection.id)
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
      event.preventDefault()
    }

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    const onSelection = (event) => {
      const selection = { ...event.target.dataset }
      console.debug('Category selection:', selection, selection.id, selection.title, selection.parentId)

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
      const categorySearch$ = inputEvent$(vm.refs.search, 1)
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)
        .map(F.sortBy(propertyCompare('title', false)))

      categorySearch$
        .observe(updateCategories, console.error)

      init()
      addEvents()
    })

    vm.on('unmount', removeEvents)
  </script>

</popup-category-selector>
