<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-bookmark-form>

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
          <a class="btn btn-primary input-group-btn icon-button" href="{opts.bookmark.favIconUrl}" target="_new">
            <img class="icon favicon"
              if="{opts.bookmark.favIconUrl}"
              src="{opts.bookmark.favIconUrl}"
              alt="{opts.bookmark.favIconUrl}"
              title="{opts.bookmark.favIconUrl}">
          </a>
        </div>
      </div>

      <popup-category-selector></popup-category-selector>

      <div class="form-group">
        <label for="category">Category</label>
        <div class="input-group">
          <input class="form-input" type="text" placeholder="Search by typing">
          <button class="btn btn-primary input-group-btn">Filter</button>
        </div>
      </div>

      <div class="form-group">
        <select name="category" ref="category" class="form-select form-input">
          <option>Kirjanmerkkipalkki</option>
          <option>Internet</option>
          <option>Programming</option>
          <option>Services</option>
        </select>
      </div>

      <div class="form-group text-right">
        <button type="reset" ref="clearButton" class="btn btn-secondary">Clear</button>
        <button type="button" ref="updateButton" class="btn btn-secondary">Update</button>
        <button type="submit" ref="submitButton" class="btn btn-primary">Add</button>
      </div>
    </fieldset>
  </form>

  <style>
    :scope {
    }

    .btn:not(:last-child) {
      margin-right: 0.4rem;
    }

    .form-group:last-child {
      margin-top: 1rem;
    }

    img.icon.favicon {
      height: auto;
      width: 1.4rem;
      top: -10%;
    }
  </style>

  <script>
    import { events } from '../lib/events'
    const vm = this

    function reset () {
      vm.opts.bookmark = {
        title: '',
        url: '',
        favIconUrl: '',
        category: '',
      }
      vm.update()
      console.debug('Form reseted.')
    }

    function updateForm (page) {
      vm.opts.bookmark = {
        title: page.title,
        url: page.url,
        favIconUrl: page.favIconUrl,
        category: page.category,
      }
      vm.update()
      console.debug('Form updated:', vm.bookmark, vm.refs.form)
    }

    function onUpdate (event) {
      updateForm({
        title: 'Google',
        url: 'https://www.google.com/',
        favIconUrl: 'https://www.google.com/favicon.ico',
        category: 'Internet',
      })
      vm.update()
      event.preventDefault()
    }

    function onSubmit (event) {
      const form = vm.refs.form
      vm.opts.bookmark = {
        title: form.title.value,
        url: form.url.value,
        favIconUrl: form.favIconUrl.value,
        category: form.category.value,
      }
      console.debug('Form submitted:', vm.bookmark, form, event)
      vm.update()
      event.preventDefault()
      return true
    }

    function onReset (event) {
      reset()
      event.preventDefault()
    }

    const addEvents = () => {
      events.add(vm.refs.form, 'submit', onSubmit)
      events.add(vm.refs.clearButton, 'click', onReset)
      events.add(vm.refs.submitButton, 'click', onSubmit)
      events.add(vm.refs.updateButton, 'click', onUpdate)
    }

    const removeEvents = () => {
      events.remove(vm.refs.form, 'submit', onSubmit)
      events.remove(vm.refs.clearButton, 'click', onReset)
      events.remove(vm.refs.submitButton, 'click', onSubmit)
      events.remove(vm.refs.updateButton, 'click', onUpdate)
    }

    vm.on('mount', (opts) => {
      addEvents()
    })

    vm.on('unmount', () => {
      removeEvents()
    })

    reset()

  </script>

</popup-bookmark-form>
