<app>
  <h1>Add bookmark</h1>

  <popup-bookmark-form></popup-bookmark-form>

  <style>
    :scope {
      --riot-color: #333;
      display: block;
    }
    h1 {
      color: var(--riot-color);
    }
  </style>

  <script>
    import './popup-bookmark-form.tag'

    const name = 'Rollup'
    this.content = `Hello **${name}**!`
  </script>
</app>
