<sp-recent-categories>
  <ul class="menu" aria-role="menu" tabindex="-1"
      data-is="sp-category-list" categories="{ categories }">
  </ul>

  <script>
    import './sp-category-list.tag'
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
