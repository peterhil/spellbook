<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<bookmark-path>
  <div class="bookmark-path">
    <small>{ path }</small>
  </div>

  <script>
    import { getParentPath } from '../lib/chrome/bookmarks.js'
    const vm = this

    vm.on('mount', () => {
      const getPath = async function () {
        vm.path = await getParentPath(opts.bookmark)
        vm.update()
      }

      getPath()
    })
  </script>
</bookmark-path>
