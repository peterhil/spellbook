<script>
    import { equals } from 'rambda'
    import { dropdownShown } from '../lib/stores/dropdown'

    export let name

    export const isVisible = equals(name)
</script>

<nav id="dropdown-{name}"
     class="category dropdown"
     class:active={ isVisible($dropdownShown) }>
    <slot></slot>
</nav>
