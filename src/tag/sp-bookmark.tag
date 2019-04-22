<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-bookmark>

  <a href={ opts.bookmark.url }
    class="bookmark"
    data-id={ opts.bookmark.id }
    data-parent-id={ getParentId(opts.bookmark) }
    data-title={ opts.bookmark.title }
    data-url={ opts.bookmark.url }}
    tabindex="0"
  >
    <div>{ opts.bookmark.title }</div>
    <small class="url">{ opts.bookmark.url }</small>
    <sp-bookmark-path bookmark={ opts.bookmark }></sp-bookmark-path>
  </a>

  <script>
    import { getParentId } from '../platform/common/bookmarks.js'
    const vm = this

    vm.getParentId = getParentId
  </script>

</sp-bookmark>
