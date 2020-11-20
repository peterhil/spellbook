<script>
  import { bookmarkStore as bookmark } from '../lib/stores'
  import { t as translate } from '../lib/translate'
  import BookmarkCount from './BookmarkCount.svelte'
  import BookmarkForm from '../components/BookmarkForm.svelte'
  import CloseButton from '../components/CloseButton.svelte'

  export let t = translate

  const popupHeader = () => {
    return $bookmark.saved
      ? t('saved_bookmark')
      : t('add_bookmark')
  }
</script>

<style>
  h1 {
    color: #333;
  }
</style>

<CloseButton />

<h1>{ popupHeader() } <BookmarkCount /></h1>

<BookmarkForm />
