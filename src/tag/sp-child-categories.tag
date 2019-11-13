<sp-child-categories>
  <ul class="menu" aria-role="menu" tabindex="-1">
    <li
      class="menu-item" each="{ category in children }"
      data-is="sp-category" category="{ category }"
      >
    </li>
  </ul>

  <script>
    import './sp-category.tag'
    import { filter, sortBy } from 'fkit'
    import { propertyCompare } from '../lib/pure'
    import { getChildren, isCategory } from '../platform/common/bookmarks'
    import { messages } from '../lib/messaging'
    const vm = this

    vm.children = []

    async function updateChildren (category) {
      console.debug('Update children:', category)
      var children = await getChildren(category.id)
      vm.children = sortBy(propertyCompare('title', true), filter(isCategory, children))
      vm.update()
    }

    vm.on('mount', () => {
      messages.on('categorySelection', updateChildren)
    })

    vm.on('unmount', () => {
      messages.off('categorySelection', updateChildren)
    })
  </script>
</sp-child-categories>
