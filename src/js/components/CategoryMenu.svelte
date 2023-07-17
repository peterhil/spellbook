<script>
    import Category from './Category.svelte'

    export let categories
</script>

{#each categories as category}
    <div class="menu-item">
        <Category category={category} />
    </div>
{/each}
