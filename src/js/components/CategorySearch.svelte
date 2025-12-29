<script>
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import { length } from 'rambda'
    import { onMount } from 'svelte'

    import { inputEvent$ } from '../lib/reactive'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { search } from '../stores/search'

    let input = $state('')

    function searchCategories (query) {
        // console.debug('[CategorySearch] search:', query)
        messages.emit('api', { action: 'categorySearch', query })
    }

    function clearSearch () {
        // console.debug('[CategorySearch] clearSearch')
        // $search.query = ''
        $search.last = ''
        messages.emit('search:clear')
        input.focus()
    }

    function onInput (query) {
        // console.debug('[CategorySearch] onInput:', query)
        if (length(query) >= 2) {
            // console.debug('[CategorySearch] >>> Will search with query:', query)
            searchCategories(query)
        }
        else {
            clearSearch()
        }
    }

    onMount(() => {
        const options = { minLength: 0, debounceTime: 400 }
        const categorySearch$ = inputEvent$(input, options)

        categorySearch$
            .throttle(1000, { leading: true, trailing: false })
            // .spy('Throttled:')
            .observe(onInput, console.error)

        input.focus()
    })
</script>

<input name="search"
       class="form-input"
       bind:this={ input }
       bind:value={ $search.query }
       onfocus={bubble('focus')}
       placeholder={ t('search_placeholder') }
       autocomplete="off">
