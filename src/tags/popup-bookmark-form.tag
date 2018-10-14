<popup-bookmark-form>

  <form onsubmit="{ submit }">
    <fieldset>
      <div class="form-field">
        <label>Title</label>
        <input model="form.title">
      </div>

      <div class="form-field">
        <label>Url</label>
        <input model="form.url">
      </div>

      <div class="form-field">
        <label>Icon URL</label>
        <input model="form.icon_url">
      </div>

      <popup-category-selector></popup-category-selector>

      <div class="form-field">
        <button type="reset" onclick="reset()" class="ui button secondary">Cancel</button>
        <button type="submit" onclick="submit()" class="ui button primary">Add</button>
      </div>
    </fieldset>
  </form>

  <style>
    :scope {
    }

    form {
      font-size: 1rem;
    }

    fieldset {
      margin: 0;
      padding: 0;
      border: none;
    }

    label {
      margin: 0 0 0.4em;
      display: block;
    }

    input {
      display: block;
      line-height: 2em;
      font-size: 1em;
      margin: 0 0 1em;
      padding: 0.2em 0.6em;
      width: 100%;
      box-sizing: border-box;
    }

    .form-field {
      margin-bottom: 1em;
      width: 100%;
    }

  </style>

  <script>
    this.form = {
      title: '',
      url: '',
      icon_url: '',
    }
  </script>

</popup-bookmark-form>
