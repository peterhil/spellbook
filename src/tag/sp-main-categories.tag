<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-main-categories>

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

  <script>
    import { bookmarksBarCategoryId, otherCategoryId } from '../platform/common/bookmarks.js'
    import { t } from '../lib/translate'
    const vm = this

    vm.bookmarksBarCategoryId = bookmarksBarCategoryId
    vm.otherCategoryId = otherCategoryId
    vm.t = t
  </script>
</sp-main-categories>
