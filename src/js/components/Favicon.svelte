<script>
    import IconNoir from '../components/IconNoir.svelte'

    export let icon
</script>

<style>
    :scope {
        display: contents;
    }

    .input-group-addon.with-icon {
        padding: 0.2rem;
    }

    .icon.favicon {
        width: 24px;
        height: 24px;
    }
</style>

<span class="input-group-addon" class:with-icon={ icon }>
    {#if icon}
        <img class="icon favicon"
             src={ icon } alt={ icon } title={ icon }>
    {:else}
        <IconNoir icon="bookmark-empty" />
    {/if}
</span>
