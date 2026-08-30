<script>
    import Category from './Category.svelte'

    let { categories } = $props()
</script>

{#each categories as category (category.id)}
    <div class="menu-item">
        <Category category={category} />
    </div>
{/each}
