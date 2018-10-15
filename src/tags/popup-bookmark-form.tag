<popup-bookmark-form>

  <form ref="bookmarkForm" model={form}>
    <fieldset>
      <div class="form-group">
        <label for="title">Title</label>
        <input name="title" ref="title" value="{form.title}" class="form-input">
      </div>

      <div class="form-group">
        <label for="url">Url</label>
        <div class="input-group">
          <input name="url" ref="url" type="url" value="{form.url}" class="form-input">
          <input name="icon_url"  ref="icon_url" type="hidden" value="{form.icon_url}" class="form-input">
          <a class="btn btn-primary input-group-btn icon-button" href="{form.icon_url}" target="_new">
            <img if="{form.icon_url}" class="icon favicon" src="{form.icon_url}" alt="{form.icon_url}" title="{form.icon_url}">
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
      vm.form = {
        title: '',
        url: '',
        icon_url: '',
      }
      vm.update()
      console.debug('Form reseted.')
    }

    function updateForm () {
      const form = vm.refs.bookmarkForm
      vm.form = {
        title: vm.refs.title.value || 'Google',
        url: vm.refs.url.value || 'https://www.google.com/',
        icon_url: vm.refs.icon_url.value || 'https://www.google.com/favicon.ico',
        category: vm.refs.category.value,
      }
      vm.update()
      console.debug('Form updated:', vm.form, vm.refs.bookmarkForm)
    }

    function onUpdate (event) {
      updateForm()
      event.preventDefault()
    }

    function onSubmit (event) {
      const form = vm.refs.bookmarkForm
      vm.form = {
        title: form.title.value,
        url: form.url.value,
        icon_url: form.icon_url.value,
        category: form.category.value,
      }
      console.debug('Form submitted:', vm.form, form, event)
      vm.update()
      event.preventDefault()
      return true
    }

    function onReset (event) {
      reset()
      event.preventDefault()
    }

    const addEvents = () => {
      events.add(vm.refs.bookmarkForm, 'submit', onSubmit)
      events.add(vm.refs.clearButton, 'click', onReset)
      events.add(vm.refs.submitButton, 'click', onSubmit)
      events.add(vm.refs.updateButton, 'click', onUpdate)
    }
    const removeEvents = () => {
      events.remove(vm.refs.bookmarkForm, 'submit', onSubmit)
      events.remove(vm.refs.clearButton, 'click', onReset)
      events.remove(vm.refs.submitButton, 'click', onSubmit)
      events.remove(vm.refs.updateButton, 'click', onUpdate)
    }

    vm.on('mount', addEvents)
    vm.on('unmount', removeEvents)

    /* updateForm()*/

  </script>

</popup-bookmark-form>
