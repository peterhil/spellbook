<script>
  import Category from './Category.svelte'
  export let categories
</script>

<style>
  .menu-item + .menu-item {
    margin-top: 0;
  }
</style>

{#each categories as category}
<li class="menu-item">
  <Category category={category} />
</li>
{/each}
