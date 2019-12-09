<script>
  import { dropdownStore as dropdown } from '../lib/stores'
  export let name

  export const isVisible = (value) => {
    return name === value
  }
</script>

<nav id="#dropdown-{name}" class="category dropdown" class:active={isVisible($dropdown)}>
  <slot></slot>
</nav>
