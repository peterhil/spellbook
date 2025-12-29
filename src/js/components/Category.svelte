<script>
   import { preventDefault } from 'svelte/legacy';

    import { messages } from '../lib/messaging'
    import { getParentId } from '../api/categories.js'
    import BookmarkPath from './BookmarkPath.svelte'

   let { category } = $props();
    let elem = $state()

    function onClick () {
        const selection = { ...elem.dataset }
        // console.debug('[Category] clicked:', selection, event)
        messages.emit('categorySelected', selection)
        return false
    }
</script>

<a href="#{category.id}" class="category" tabindex="0"
   bind:this={elem}
   onclick={preventDefault(onClick)}
   data-title={category.title}
   data-id={category.id}
   data-parent-id={getParentId(category)}
   >
    <div class="title">{category.title}</div>
    <div class="info">
        <BookmarkPath bookmark={category} />
    </div>
</a>
