<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-bookmark-path>
  <small class="parents">{ path }</small>

  <style>
    .parents {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  </style>

  <script>
    import { getParentPath } from '../platform/common/bookmarks.js'
    const vm = this
    const getPath = async function () {
      vm.path = await getParentPath(opts.bookmark)
      vm.update()
    }

    vm.on('mount', () => {
      getPath()
    })
  </script>
</sp-bookmark-path>
