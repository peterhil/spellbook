<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-bookmark-form>
  <close-button></close-button>

  <h1>{ popupHeader() }</h1>

  <form ref="form" model="{opts.bookmark}">
    <fieldset>
      <div class="form-group">
        <label for="title">Title</label>
        <input name="title" ref="title" value="{opts.bookmark.title}" class="form-input">
      </div>

      <div class="form-group">
        <label for="url">Url</label>
        <div class="input-group">
          <input name="url" ref="url" type="url" value="{opts.bookmark.url}" class="form-input">
          <input name="favIconUrl" ref="favIconUrl" type="hidden" value="{opts.bookmark.favIconUrl}" class="form-input">
          <span class={input-group-addon: true, with-icon: opts.bookmark.favIconUrl}>
            <img class="icon favicon"
              if="{opts.bookmark.favIconUrl}"
              src="{opts.bookmark.favIconUrl}"
              alt="{opts.bookmark.favIconUrl}"
              title="{opts.bookmark.favIconUrl}">
            <i class="icon icon-bookmark"
              if="{!opts.bookmark.favIconUrl}">
            </i>
          </span>
        </div>
      </div>

      <popup-category-selector category="{opts.bookmark.category}"></popup-category-selector>

      <div class="form-group text-right">
        <button type="submit" ref="submitButton" class="btn btn-primary">Add</button>
      </div>
    </fieldset>
  </form>

  <style>
    :scope {
      --riot-color: #333;
      display: block;
    }

    h1 {
      color: var(--riot-color);
    }

    .btn:not(:last-child) {
      margin-right: 0.4rem;
    }

    .form-group:last-child {
      margin-top: 1rem;
    }

    .input-group-addon.with-icon {
      padding: 0.15rem;
    }

    .icon.favicon {
      height: auto;
      width: 1.4rem;
    }

    .icon-bookmark {
      vertical-align: text-top;
      height: 1rem;
      width: 1rem;
    }
  </style>

  <script>
    import './close-button.tag'
    import './popup-category-selector.tag'
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

    vm.on('mount', () => {
      addEvents()
    })

    vm.on('unmount', () => {
      removeEvents()
    })
  </script>

</popup-bookmark-form>
