<script>
    import { equals } from 'rambda'
    import { dropdownShown } from '../stores/dropdown'

    let { name, children } = $props();

    export const isVisible = equals(name)
</script>

<nav id="dropdown-{name}"
     class="category dropdown"
     class:active={ isVisible($dropdownShown) }
     class:d-hide={ !isVisible($dropdownShown) }
     >
    {@render children?.()}
</nav>
