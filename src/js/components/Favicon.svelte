<script>
    import Icon from '../components/Icon.svelte'

    export let icon
</script>

<span class="input-group-addon" class:with-icon={ icon }>
    {#if icon}
        <img class="icon favicon"
             src={ icon } alt={ icon } title={ icon }>
    {:else}
        <Icon icon="bookmark" />
    {/if}
</span>
