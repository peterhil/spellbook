<sp-directory-header>

  <header class="navbar">
    <section class="navbar-section">
      <h1>Spellbook</h1>
    </section>
    <section class="navbar-section">
      <input type="text" placeholder={ t('search') }></input>
    </section>
  </header>

  <style>
    :scope {
      --primary-text: white;
      --primary-color: #5755d9;
      --border-color: #4b48d6;
    }

    .navbar {
      padding: 15px;
      color: var(--primary-text);
      border-bottom: 1px solid var(--border-color);
      background-color: var(--primary-color);
      background: no-repeat 0 38% / cover url(/asset/spellbook-bg.jpg);
    }

    h1 {
      margin: 0;
      padding: 0;
    }
  </style>

  <script>
    import { t } from '../lib/translate'
    const vm = this
    vm.t = t
  </script>

</sp-directory-header>
