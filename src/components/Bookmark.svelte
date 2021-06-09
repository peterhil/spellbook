<script>
    import { getParentId } from '../api/categories.js'
    import BookmarkPath from './BookmarkPath.svelte'
    export let bookmark
</script>

<style>
    .bookmark {
        word-break: break-word;
    }

    .bookmark:hover {
        margin-bottom: -2px;
        border-bottom: 2px solid #4b48d6;
    }

    .bookmark .title {
        font-weight: bolder;
    }

    .url {
        font-weight: 400;
        font-size: 80%;
    }
</style>

<a class="bookmark" href={bookmark.url}
   data-id={bookmark.id}
   data-parent-id={getParentId(bookmark)}
   data-title={bookmark.title}
   data-url={bookmark.url}
   tabindex="0">
    <div class="title">{bookmark.title}</div>
    <div class="url">{bookmark.url}</div>
    <div class="label label-secondary">
        <BookmarkPath bookmark={bookmark} />
    </div>
</a>
