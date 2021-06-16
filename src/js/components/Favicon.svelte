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
        width: 1rem;
        height: 1rem;
        vertical-align: text-top;
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
