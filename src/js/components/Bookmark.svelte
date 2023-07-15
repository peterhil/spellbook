<script>
    import { getParentId } from '../api/categories.js'
    import BookmarkPath from './BookmarkPath.svelte'
    export let bookmark
</script>

<a class="bookmark" href={bookmark.url}
   data-id={bookmark.id}
   data-parent-id={getParentId(bookmark)}
   data-title={bookmark.title}
   data-url={bookmark.url}
   tabindex="0">
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
