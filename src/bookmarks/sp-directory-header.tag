<sp-directory-header>

  <header class="navbar">
    <section class="navbar-section">
      <h1>Spellbook</h1>
    </section>
    <section class="navbar-section">
      <input class="search" type="text" placeholder={ t('search') }></input>
    </section>
  </header>

  <style type="scss">
    .navbar {
      padding: 0 0.8rem;
      border: none;
      color: var(--primary-text);
      background: no-repeat 0 38% / cover url('/asset/spellbook-bg.jpg') var(--primary-color);

      & > * {
        line-height: 30px;
      }
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 20px;
    }

    .search {
      border: 1px solid #555;
      padding: 0px 0.4rem;
      line-height: 28px;
      font-size: 14px;
    }
  </style>

  <script>
    import { t } from '../lib/translate'
    const vm = this
    vm.t = t
  </script>

</sp-directory-header>
