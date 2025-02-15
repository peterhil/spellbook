<script>
    import { onMount } from 'svelte'

    import { dropdownShown } from '../stores/dropdown'
    import { search } from '../stores/search'
    import { categorySelection as selection } from '../stores/categorySelection'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'

    import IconFa from './IconFa.svelte'
    import InputGroup from './form/InputGroup.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} [lastSelection]
     * @property {import('svelte').Snippet} [status]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { lastSelection = $bindable(null), status, children } = $props();

    function clearSelection () {
        // console.debug('[CategorySelector] clearSelection')
        selection.reset()
        $dropdownShown = null
    }

    function onSelection (category) {
        // console.debug('[CategorySelector] selection:', category)
        $selection = category
        lastSelection = category
        $search.query = category.title
        $dropdownShown = null
        messages.emit('categorySelection', $selection)
    }

    onMount(() => {
        messages.on('categorySelected', onSelection)
        messages.on('search:clear', clearSelection)
    })
</script>

<InputGroup
    name="parentId"
    type="hidden"
    bind:value={ $selection.id }
    on:categorySelected={ onSelection }
    >
    {#snippet label()}
        <label  for="parentId" class="clearfix">
            { t('category') }
            <small class="status float-right">
                {@render status?.()}
                {#if lastSelection && $selection.id}
                    <span class="label label-primary" title="{ t('selected_category') }">
                        <IconFa icon="check" />
                        { lastSelection.title }
                    </span>
                {/if}
            </small>
        </label>
    {/snippet}
    {@render children?.()}
</InputGroup>
