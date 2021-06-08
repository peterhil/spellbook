<script>
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

    .icon-bookmark {
        vertical-align: text-top;
        height: 1rem;
        width: 1rem;
    }
</style>

<span class="input-group-addon" class:with-icon={ icon }>
    {#if icon}
        <img class="icon favicon"
             src={ icon } alt={ icon } title={ icon }>
    {:else}
        <i class="icon icon-bookmark"></i>
    {/if}
</span>
