<script>
    import { equals } from 'rambda'
    import { dropdownShown } from '../stores/dropdown'

    let { name, children } = $props()

    let isVisible = $derived(equals(name, $dropdownShown))
</script>

<nav id="dropdown-{name}"
     class="category dropdown"
     class:active={isVisible}
     class:d-hide={!isVisible}
     >
    {@render children?.()}
</nav>
