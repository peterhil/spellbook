<script>
    import Category from './Category.svelte'

    export let categories
</script>

{#each categories as category}
    <Category category={category} />
{/each}
