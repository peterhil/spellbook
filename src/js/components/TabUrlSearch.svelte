<script>
    import Bookmark from './Bookmark.svelte'

    import { t } from '../lib/translate'
    import { savedBookmarks } from '../stores/savedBookmarks'

    $: bookmarkCount = $savedBookmarks.size
    $: popupHeader = (
        bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark')
    )
</script>

<div class="card">
    <div class="card-header">
        <h1>
            { popupHeader }
            <span class="bookmark-count">({ bookmarkCount })</span>
        </h1>
    </div>
    <div class="card-body">
        <div class="saved-bookmarks">
            {#each [...$savedBookmarks.values()] as bookmark (bookmark.id)}
                <Bookmark {bookmark} />
            {/each}
        </div>
    </div>
</div>
