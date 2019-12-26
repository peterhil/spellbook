<script>
  import { getParentPath } from '../api/categories.js'
  export let bookmark

  const getPath = async function () {
    path = await getParentPath(bookmark)
  }

  $: path = getPath(bookmark)
</script>

<style>
  .parents {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<small class="parents">{path}</small>
