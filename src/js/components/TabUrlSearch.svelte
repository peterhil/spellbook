<script>
    import Bookmark from './Bookmark.svelte'

    import { t } from '../lib/translate'
    import { savedBookmarks } from '../stores/savedBookmarks'

    /**
     * @typedef {Object} Props
     * @property {boolean} [active]
     */

    /** @type {Props} */
    let { active = true } = $props();

    let bookmarkCount = $derived($savedBookmarks.size)
    let popupHeader = (
        $derived(bookmarkCount >= 1
            ? t('saved_bookmark')
            : t('add_bookmark'))
    )
</script>

<div class="card" class:d-hide={ !active }>
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
