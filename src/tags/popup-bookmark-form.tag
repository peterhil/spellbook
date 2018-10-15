<popup-bookmark-form>

  <form onsubmit="{ submit }" class="">
    <fieldset>
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" model="form.title" class="form-input">
      </div>

      <div class="form-group">
        <label for="url">Url</label>
        <input id="url" type="url" model="form.url" class="form-input">
      </div>

      <div class="form-group">
        <label for="icon_url">Icon URL</label>
        <input id="icon_url" type="url" model="form.icon_url" class="form-input">
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
        <select id="category" class="form-select form-input">
          <option>Kirjanmerkkipalkki</option>
          <option>Internet</option>
          <option>Programming</option>
          <option>Services</option>
        </select>
      </div>

      <div class="form-group text-right">
        <button onclick="reset()" class="btn btn-secondary">Cancel</button>
        <button onclick="submit()" class="btn btn-primary">Add</button>
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
  </style>

  <script>
    this.form = {
      title: '',
      url: '',
      icon_url: '',
    }
  </script>

</popup-bookmark-form>
