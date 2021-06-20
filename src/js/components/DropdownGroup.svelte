<script>
    import { equals } from 'rambda'
    import { onMount } from 'svelte'

    import { dropdownShown } from '../stores/dropdown'
    import { messages } from '../lib/messaging'

    const isVisible = (dropdown) => equals($dropdownShown, dropdown)

    function toggleDropdown (dropdown) {
        $dropdownShown = (
            isVisible(dropdown)
                ? null
                : dropdown)
        // console.debug('[CategorySelector] toggleDropdown:', $dropdownShown)
    }

    function onToggle (dropdown) {
        return () => toggleDropdown(dropdown)
    }

    onMount(() => {
        messages.on('button:toggleChildren', onToggle('children'))
        messages.on('button:toggleSubcategory', onToggle('subcategory'))
        messages.on('button:toggleRecent', onToggle('recent'))
    })
</script>

<slot></slot>
