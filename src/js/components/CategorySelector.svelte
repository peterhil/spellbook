<script>
    import { equals } from 'rambda'
    import { onMount } from 'svelte'

    import { dropdownShown } from '../stores/dropdown'
    import { categorySelection as selection } from '../stores/categorySelection'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'

    import Button from './Button.svelte'
    import Icon from './Icon.svelte'
    import IconFa from './IconFa.svelte'

    export let lastSelection = null

    const isVisible = (dropdown) => equals($dropdownShown, dropdown)

    function clearSelection () {
        selection.reset()
        $dropdownShown = null
    }

    function onSelection (value) {
        // console.debug('[CategorySelector] selection:', value)
        $selection = value
        lastSelection = value
        messages.emit('categorySelection', $selection)
        $dropdownShown = null
    }

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
        messages.on('categorySelected', onSelection)
        messages.on('search:clear', clearSelection)
        messages.on('button:toggleChildren', onToggle('children'))
        messages.on('button:toggleSubcategory', onToggle('subcategory'))
        messages.on('button:toggleRecent', onToggle('recent'))
    })
</script>

<style lang="scss">
    .status .label {
        margin-bottom: 0.2rem;
    }
</style>

<label for="category" class="clearfix">
    { t('category') }
    <small class="status float-right">
        <slot name="status"></slot>
        {#if $selection.id }
            <span class="label label-primary" title="{ t('selected') }">
                <IconFa icon="check" />
                { lastSelection.title }
            </span>
        {/if}
    </small>
</label>
<div class="input-group">
    <input
        name="category"
        type="hidden"
        bind:value={ $selection.id }
        on:categorySelected={ onSelection }
        >
    <slot></slot>
    {#if $selection.id }
        <Button name="toggleChildren" classes="input-group-btn"
                title={ t('subcategories') }>
            <IconFa icon="sitemap" />
        </Button>
        <Button name="toggleSubcategory" classes="input-group-btn"
                title={ t('add_subcategory') }>
            <Icon icon="plus" />
        </Button>
    {/if}
    <Button name="toggleRecent" classes="input-group-btn"
            title={ t('recent_categories') }>
        <IconFa icon="history" />
    </Button>
</div>
