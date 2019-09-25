<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-recent-categories>
  <div class="form-group">
    <div class="{categories: true, dropdown: true, active: isDropdownVisible()}">
      <ul class="menu" aria-role="menu" tabindex="-1">
        <li
          class="menu-item" each="{ category in categories }"
          data-is="sp-category" category="{ category }"
          >
        </li>
      </ul>
    </div>
  </div>

  <script>
    import './sp-category.tag'

    const vm = this

    vm.categories = [
    ]
    vm.showDropdown = false

    vm.isDropdownVisible = () => {
      return vm.showDropdown
    }

    const updateRecentCategories = (categories) => {
      vm.categories = categories
      vm.update()
    }
</script>
</sp-recent-categories>
