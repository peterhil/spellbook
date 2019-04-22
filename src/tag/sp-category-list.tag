<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-category-list>

  <li class="menu-item" each="{ category in opts.categories }" no-reorder>
    <a class="category" data-id={ category.id } data-title={ category.title } data-parent-id={ getParentId(category) } tabindex="0">
      <div>{ category.title }</div>
      <sp-bookmark-path bookmark={ category }></sp-bookmark-path>
    </a>
  </li>

  <script>
    import { getParentId } from '../platform/common/bookmarks.js'
    const vm = this

    vm.getParentId = getParentId
  </script>

</sp-category-list>
