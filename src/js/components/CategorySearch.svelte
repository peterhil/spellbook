<script>
    import { length } from 'rambda'
    import { inputEvent$ } from '../lib/reactive'
    import { messages } from '../lib/messaging'
    import { onMount } from 'svelte'
    import { t } from '../lib/translate'

    export let name
    export let value = ''

    let search = ''

    function searchCategories (query) {
        messages.emit('api', { type: 'categorySearch', query })
    }

    function clearSearch () {
        // value = ''
        messages.emit('search:clear')
        search.focus()
    }

    function onInput (query) {
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
        const categorySearch$ = inputEvent$(search, options)

        categorySearch$
            .throttle(1000, { leading: true, trailing: false })
            // .spy('Throttled:')
            .observe(onInput, console.error)

        search.focus()
    })
</script>

<svelte:options accessors />
<input {name}
       class="form-input"
       bind:this={search}
       bind:value={value}
       on:focus
       placeholder={ t('search_placeholder') }
       autocomplete="off">
