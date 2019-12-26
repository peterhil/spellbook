<script>
  import { bookmarksBarCategoryId, otherCategoryId } from '../api/bookmarks.js'
  import { t as translate } from '../lib/translate'

  export let t = translate
</script>

<li class="menu-item">
  <a data-title="Bookmarks Bar" data-id={bookmarksBarCategoryId}
     href="#{bookmarksBarCategoryId}" class="category"
     tabindex="0">
    <div class="title">{ t('bookmarks_bar') }</div>
  </a>
</li>
<li class="menu-item">
  <a data-title="Other Bookmarks" data-id={otherCategoryId}
     href="#{otherCategoryId}" class="category"
     tabindex="0">
    <div class="title">{ t('other_bookmarks') }</div>
  </a>
</li>
