<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-category-selector>

  <div class="form-group">
    <label for="category">Category</label>
    <div class="input-group">
      <input name="search" ref="search" class="form-input" type="text" placeholder="Search by typing">
      <!-- <button class="btn btn-primary input-group-btn">Filter</button> -->
    </div>

    <div if="{categories}" class="categories">
      <select name="category" ref="category" class="form-select form-input" tabindex="-1">
        <option value="1">Bookmarks Bar</option>
        <option value="2" selected>Other Bookmarks</option>
        <option each="{categories}" value="{id}">{title}</option>
      </select>

      <div class="dropdown category-dropdown">
        <div class="btn-group">
          <a href="#" class="btn btn-primary" tabindex="-1">Categories</a>
          <a href="#" class="btn btn-primary dropdown-toggle" tabindex="0">
            <i class="icon icon-caret"></i>
          </a>
          <ul class="menu">
            <li each="{categories}" class="menu-item">
              <a href="#" data-id="{id}">{title}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <style>
    .category-dropdown {
      width: 100%;
    }

    .category-dropdown .menu {
      right: 0;
    }
  </style>

  <script>
    import { bookmarkSearch, filterCategories } from '../lib/chrome/bookmarks.js'
    import { inputEvent$ } from '../lib/util'
    const vm = this

    vm.categories = []

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    vm.on('mount', () => {
      const categorySearch$ = inputEvent$(vm.refs.search)
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)

      categorySearch$
        .observe(updateCategories, console.error)

      vm.refs.search.focus()
    })
  </script>

</popup-category-selector>
