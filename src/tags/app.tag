<app>
  <h1>Add bookmark</h1>

  <my-tag></my-tag>
  <timer start="10">Timer</timer>

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
    import './timer.tag'
    import '../greeting'

    const name = 'Rollup'
    this.content = `Hello **${name}**!`
  </script>
</app>
