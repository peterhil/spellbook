<script>
  import { onMount } from 'svelte'
  import { getParentPath } from '../platform/common/bookmarks.js'
  export let path = ''
  export let bookmark

  const getPath = async function () {
    path = await getParentPath(bookmark)
  }

  onMount(getPath)
</script>

<style>
  .parents {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<small class="parents">{path}</small>
