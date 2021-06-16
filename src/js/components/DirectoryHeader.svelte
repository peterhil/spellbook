<script>
    import { t } from '../lib/translate'
</script>

<style type="scss">
    .navbar {
        padding: 0 0.8rem;
        color: var(--primary-text);
        background: no-repeat 0 38% / cover url('/img/spellbook-bg.jpg') var(--primary-color);
        border: 0;
    }

    .navbar > * {
        line-height: 30px;
    }

    h1 {
        margin: 0;
        padding: 0;
        font-size: 20px;
    }

    .search {
        padding: 0 0.4rem;
        font-size: 14px;
        line-height: 28px;
        border: 1px solid #555;
    }
</style>

<header class="navbar">
    <section class="navbar-section">
        <h1>Spellbook</h1>
    </section>
    <section class="navbar-section">
        <input class="search" type="text" placeholder={t('search')}>
    </section>
</header>
