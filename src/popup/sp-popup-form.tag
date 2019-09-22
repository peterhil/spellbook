<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-popup-form>
  <sp-close-button></sp-close-button>

  <h1>{ popupHeader() }</h1>

  <form ref="form" model={ opts.bookmark }>
    <div class="form-group">
      <label for="title">{ t('title') }</label>
      <input name="title" ref="title" required value={ opts.bookmark.title } class="form-input">
    </div>

    <div class="form-group">
      <label for="url">{ t('url') }</label>
      <div class="input-group">
        <input name="url" ref="url" type="url" required value={ opts.bookmark.url } class="form-input">
        <sp-favicon favicon={ opts.bookmark.favIconUrl }></sp-favicon>
      </div>
    </div>

    <sp-category-selector category={ opts.bookmark.category }></sp-category-selector>

    <div class="form-group text-right buttons-row">
      <button type="submit" ref="submitButton" class="btn btn-primary">{ t('buttons_add') }</button>
    </div>
  </form>

  <style>
    :scope {
      display: block;
    }

    h1 {
      color: #333;
    }

    .btn[type=submit] {
      padding: .25rem .8rem;
    }
  </style>

  <script>
    import '../tag/sp-category-selector.tag'
    import '../tag/sp-close-button.tag'
    import '../tag/sp-favicon.tag'
    import { createBookmark } from '../platform/common/bookmarks'
    import { events } from '../lib/events'
    import { t } from '../lib/translate'
    const vm = this

    vm.t = t
    vm.popupHeader = () => {
      return vm.opts.bookmark.saved
           ? t('saved_bookmark')
           : t('add_bookmark')
    }

    const onSubmit = (event) => {
      const form = vm.refs.form
      const valid = form.reportValidity()
      const params = {
        parentId: form.category.value,
        title: form.title.value,
        url: form.url.value,
      }
      const subcategory = form.subcategory && form.subcategory.value

      console.debug('Bookmark form submitted:', params, subcategory)

      if (!valid) {
        return
      }

      if (subcategory) {
        createBookmark({
          parentId: params.parentId,
          title: subcategory,
        }, (subcategory) => {
          params.parentId = subcategory.id
          createBookmark(params, () => {
            vm.opts.bookmark.saved = true
          })
        })
      } else {
        createBookmark(params, () => {
          vm.opts.bookmark.saved = true
        })
      }

      vm.update()
      event.preventDefault()
      window.close()
    }

    const addEvents = () => {
      events.add(vm.refs.form, 'submit', onSubmit)
      events.add(vm.refs.submitButton, 'click', onSubmit)
    }

    const removeEvents = () => {
      events.remove(vm.refs.form, 'submit', onSubmit)
      events.remove(vm.refs.submitButton, 'click', onSubmit)
    }

    vm.on('mount', addEvents)
    vm.on('unmount', removeEvents)
  </script>

</sp-popup-form>
