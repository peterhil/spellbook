<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-category-list>

  <li class="menu-item" each="{ category in opts.categories }" no-reorder
    data-is="sp-category" category="{ category }">
  </li>

  <script>
    import './sp-category.tag'
  </script>

</sp-category-list>
