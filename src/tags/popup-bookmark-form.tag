<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-bookmark-form>
  <close-button></close-button>

  <h1>{ popupHeader() }</h1>

  <form ref="form" model="{opts.bookmark}">
    <div class="form-group">
      <label for="title">Title</label>
      <input name="title" ref="title" value="{opts.bookmark.title}" class="form-input">
    </div>

    <div class="form-group">
      <label for="url">Url</label>
      <div class="input-group">
        <input name="url" ref="url" type="url" value="{opts.bookmark.url}" class="form-input">
        <popup-favicon favicon="{opts.bookmark.favIconUrl}"></popup-favicon>
      </div>
    </div>

    <div class="form-group">
      <popup-category-selector category="{opts.bookmark.category}"></popup-category-selector>
    </div>

    <div class="form-group text-right">
      <button type="submit" ref="submitButton" class="btn btn-primary">Add</button>
    </div>
  </form>

  <style>
    :scope {
      --riot-color: #333;
      display: block;
    }

    h1 {
      color: var(--riot-color);
    }

    .form-group:last-child {
      margin-top: 1rem;
    }

    .btn[type=submit] {
      padding: .25rem .8rem;
    }
  </style>

  <script>
    import './close-button.tag'
    import './popup-category-selector.tag'
    import './popup-favicon.tag'
    import { createBookmark } from '../lib/chrome/bookmarks'
    import { events } from '../lib/events'
    const vm = this

    vm.popupHeader = () => {
      return vm.opts.bookmark.saved
           ? 'Bookmark added'
           : 'Add bookmark'
    }

    const onSubmit = (event) => {
      const form = vm.refs.form
      const valid = form.reportValidity()
      const params = {
        parentId: form.category.value,
        title: form.title.value,
        url: form.url.value,
      }

      console.debug('Bookmark form submitted:', params)

      if (!valid) {
        return
      }

      createBookmark(params, () => {
        vm.opts.bookmark.saved = true
      })

      vm.update()
      event.preventDefault()
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

</popup-bookmark-form>
