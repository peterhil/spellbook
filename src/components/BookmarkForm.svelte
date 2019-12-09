<script>
  import { onDestroy, onMount } from 'svelte'
  import { bookmarkStore as bookmark } from '../lib/stores'
  import { createBookmark } from '../platform/common/bookmarks'
  import { messages } from '../lib/messaging'
  import { t as translate } from '../lib/translate'
  import CategorySelector from './CategorySelector.svelte'
  import Favicon from './Favicon.svelte'

  export let t = translate
  let form
  let submitButton

  const popupHeader = () => {
    return $bookmark.saved
      ? t('saved_bookmark')
      : t('add_bookmark')
  }

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
      }, (subcategory) => {
        params.parentId = subcategory.id
        createBookmark(params, () => {
          $bookmark.saved = true
        })
      })
    } else {
      createBookmark(params, () => {
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
  :scope {
    display: block;
  }

  h1 {
    color: #333;
  }

  input {
    height: 2rem;
  }

  .btn[type=submit] {
    padding: .25rem .8rem
  }
</style>

<h1>{ popupHeader() }</h1>

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
