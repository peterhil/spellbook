<script>
    import Category from './Category.svelte'

    let { categories } = $props();
</script>

{#each categories as category}
    <div class="menu-item">
        <Category category={category} />
    </div>
{/each}
