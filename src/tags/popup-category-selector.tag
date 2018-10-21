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
      <button class="btn btn-primary input-group-btn">Filter</button>
    </div>
  </div>

  <div class="form-group">
    <select name="category" ref="category" class="form-select form-input">
      <option>Kirjanmerkkipalkki</option>
      <option>Internet</option>
      <option>Programming</option>
      <option>Services</option>
    </select>
  </div>

  <script>
    import F from 'fkit'
    import Kefir from 'kefir'
    import { bookmarkSearch, filterCategories, isCategory } from '../lib/chrome/bookmarks.js'
    const vm = this

    vm.on('mount', () => {
      const search$ = Kefir
        .fromEvents(vm.refs.search, 'input')
        .map(event => event.target.value)

      search$
        .filter(query => query && query.length >= 2)
        .debounce(250)
        .skipDuplicates()
        .flatMapLatest(bookmarkSearch)  // TODO See how RxJS.switchMap cancel the previous observable
        .map(filterCategories)
        .log()
    })
  </script>

</popup-category-selector>
