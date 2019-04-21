<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-category-list>

  <li class="menu-item" each="{ category in opts.categories }">
    <a class="category" data-id={ category.id } data-title={ category.title } data-parent-id={ category.parentId } tabindex="0">
      <div>{ category.title }</div>
      <sp-bookmark-path bookmark={ category }></sp-bookmark-path>
    </a>
  </li>

</sp-category-list>
