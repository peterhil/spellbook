<script>
    import { onMount } from 'svelte'

    import { dropdownShown } from '../stores/dropdown'
    import { categorySelection as selection } from '../stores/categorySelection'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'

    import IconFa from './IconFa.svelte'
    import InputGroup from './form/InputGroup.svelte'

    export let lastSelection = null

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

    onMount(() => {
        messages.on('categorySelected', onSelection)
        messages.on('search:clear', clearSelection)
    })
</script>

<style lang="scss">
    .status .label {
        margin-bottom: 0.2rem;
    }
</style>

<InputGroup
    name="category"
    type="hidden"
    bind:value={ $selection.id }
    on:categorySelected={ onSelection }
    >
    <label slot="label" for="category" class="clearfix">
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
    <slot></slot>
</InputGroup>
