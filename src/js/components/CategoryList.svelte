<script>
    import Category from './Category.svelte'
    export let categories
</script>

{#each categories as category}
    <li class="menu-item">
        <Category category={category} />
    </li>
{:else}
    <small class="toast">No categories</small>
{/each}
