<script>
  import { onDestroy, onMount } from 'svelte'
  import { bookmarkStore as bookmark } from '../lib/stores'
  import { createBookmark } from '../api/bookmarks'
  import { messages } from '../lib/messaging'
  import { t as translate } from '../lib/translate'
  import CategorySelector from './CategorySelector.svelte'
  import Favicon from './Favicon.svelte'

  export let t = translate
  let form
  let submitButton

  const onSubmit = (event) => {
    const valid = form.reportValidity()
    const params = {
      parentId: form.category.value,
      title: form.title.value,
      url: form.url.value,
    }
    const subcategory = form.subcategory && form.subcategory.value

    console.debug('Bookmark form submitted:', params, subcategory)

    if (!valid) { return }

    if (subcategory) {
      createBookmark({
        parentId: params.parentId,
        title: subcategory,
      }).then((subcategory) => {
        params.parentId = subcategory.id
        createBookmark(params).then(() => {
          $bookmark.saved = true
        })
      })
    } else {
      createBookmark(params).then(() => {
        $bookmark.saved = true
      })
    }

    window.close()
    return false
  }

  const onTabUpdate = (tab) => {
    $bookmark = { ...tab }
  }

  onMount(() => {
    messages.on('currentTabInfo', onTabUpdate)
  })

  onDestroy(() => {
    messages.off('currentTabInfo', onTabUpdate)
  })
</script>

<style>
  .btn[type=submit] {
    padding: .25rem .8rem
  }
</style>

<form bind:this={form} on:submit|preventDefault={onSubmit}>
  <div class="form-group">
    <label for="title">{ t('title') }</label>
    <input name="title" required
           class="form-input"
           bind:value={$bookmark.title}>
  </div>

  <div class="form-group">
    <label for="url">{ t('url') }</label>
    <div class="input-group">
      <input name="url" type="url" required
             class="form-input"
             bind:value={$bookmark.url}>
      <Favicon icon={$bookmark.favIconUrl}></Favicon>
    </div>
  </div>

  <CategorySelector />

  <div class="form-group text-right buttons-row">
    <button type="submit" bind:this={submitButton} class="btn btn-primary">{ t('buttons_add') }</button>
  </div>
</form>
