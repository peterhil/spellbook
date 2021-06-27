<script>
    import { getParentId } from '../api/categories.js'
    import { humanizeDate, t } from '../lib/translate'
    import BookmarkPath from './BookmarkPath.svelte'

    export let bookmark
</script>

<a class="bookmark saved"
     href={ bookmark.url }
     data-id={ bookmark.id }
     data-parent-id={ getParentId(bookmark) }
     data-title={ bookmark.title }
     data-url={ bookmark.url }
     title="{ bookmark.title }"
     tabindex="0">
    <div class="title">{ bookmark.title }</div>
    <div class="label label-secondary">
        <BookmarkPath { bookmark } />
    </div>
    {#if bookmark.dateAdded }
        <div class="date">
            <small>
                { t('added') }: { humanizeDate(bookmark.dateAdded) }
            </small>
        </div>
    {/if}
</a>
