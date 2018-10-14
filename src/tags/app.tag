<app>
  <h1>Add bookmark</h1>

  <my-tag></my-tag>
  <timer>Timer</timer>

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
    const name = 'Rollup'
    this.content = `Hello **${name}**!`
  </script>
</app>
