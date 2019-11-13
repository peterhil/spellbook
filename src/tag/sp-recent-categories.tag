<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-recent-categories>
  <ul class="menu" aria-role="menu" tabindex="-1">
    <li
      class="menu-item" each="{ category in categories }"
      data-is="sp-category" category="{ category }"
      >
    </li>
  </ul>

  <script>
    import './sp-category.tag'
    import { messages } from '../lib/messaging'

    const vm = this

    vm.categories = []

    const updateRecentCategories = (categories) => {
      console.debug('updateRecentCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    vm.on('mount', () => {
      messages.on('recentCategories', updateRecentCategories)
    })

    vm.on('unmount', () => {
      messages.off('recentCategories', updateRecentCategories)
    })
</script>
</sp-recent-categories>
