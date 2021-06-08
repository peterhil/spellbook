<script>
    import { inputEvent$ } from '../lib/reactive'
    import { messages } from '../lib/messaging'
    import { onMount } from 'svelte'
    import { t } from '../lib/translate'

    export let name
    export let value = ''

    let search = ''

    const searchCategories = (query) => {
        messages.emit('api', { type: 'categorySearch', query })
    }

    const clearSearch = () => {
        value = ''
        messages.emit('search:clear')
        search.focus()
    }

    onMount(() => {
        const categorySearch$ = inputEvent$(search, { minLength: 2 })
        const emptySearch$ = inputEvent$(search, { minLength: 0 })
              .filter(search => search.length <= 1)

        categorySearch$.observe(searchCategories, console.error)
        emptySearch$.observe(clearSearch, console.error)

        search.focus()
    })
</script>

<svelte:options accessors />
<input {name} required
       class="form-input"
       bind:this={search}
       bind:value={value}
       on:focus
       placeholder={ t('search_placeholder') }
       autocomplete="off">
