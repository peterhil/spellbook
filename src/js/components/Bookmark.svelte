<script>
    import { getParentId } from '../api/categories.js'
    import { messages } from '../lib/messaging'

    import BookmarkPath from './BookmarkPath.svelte'
    import Icon from './Icon.svelte'

    export let bookmark

    function onDelete () {
        messages.emit('deleteBookmark', bookmark)
        return false
    }
</script>

<a class="bookmark" href={bookmark.url}
   data-id={bookmark.id}
   data-parent-id={getParentId(bookmark)}
   data-title={bookmark.title}
   data-url={bookmark.url}
   tabindex="0">
    <button class="btn btn-sm float-right"
            type="button"
            on:click|preventDefault={onDelete}>
        <Icon icon="cross" />
    </button>
    <div class="title">
        <i class="icon icon-bookmark"></i>
        {bookmark.title}
    </div>
    <div class="info">
        <div class="url">{bookmark.url}</div>
        <div class="label label-secondary">
            <BookmarkPath bookmark={bookmark} />
        </div>
    </div>
</a>
