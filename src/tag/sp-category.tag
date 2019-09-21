<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-category>

  <a
    href="#{ opts.category.id }" class="category"
    data-id={ opts.category.id } data-title={ opts.category.title } data-parent-id={ getParentId(opts.category) }
    tabindex="0"
  >
    <div class="title">{ opts.category.title }</div>
    <sp-bookmark-path bookmark={ opts.category }></sp-bookmark-path>
  </a>

  <style>
    .category .title {
      font-weight: bolder;
    }
  </style>

  <script>
    import { getParentId } from '../platform/common/bookmarks.js'
    import './sp-bookmark-path.tag'
    const vm = this

    vm.getParentId = getParentId
  </script>

</sp-category>