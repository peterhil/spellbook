<app>
  <h1>Add bookmark</h1>
  <button class="btn btn-action btn-sm float-right close-button">
    <i class="icon icon-cross"></i>
  </button>

  <popup-bookmark-form></popup-bookmark-form>

  <style>
    :scope {
      --riot-color: #333;
      display: block;
    }

    h1 {
      color: var(--riot-color);
    }

    .close-button {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      z-index: 999;
    }
  </style>

  <script>
    import './popup-bookmark-form.tag'

    const name = 'Rollup'
    this.content = `Hello **${name}**!`
  </script>
</app>
