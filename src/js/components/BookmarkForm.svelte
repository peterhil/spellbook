<script>
    import { equals, pick } from 'rambda'
    import { onMount } from 'svelte'

    import { createBookmark } from '../api/bookmarks'
    import { messages } from '../lib/messaging'
    import { t } from '../lib/translate'
    import { dropdownShown } from '../stores/dropdown'
    import { search } from '../stores/search'

    import Button from './Button.svelte'
    import CategorySearch from './CategorySearch.svelte'
    import CategorySelector from './CategorySelector.svelte'
    import ChildCategories from './ChildCategories.svelte'
    import Dropdown from './Dropdown.svelte'
    import DropdownGroup from './DropdownGroup.svelte'
    import DropdownToggles from './DropdownToggles.svelte'
    import Favicon from './Favicon.svelte'
    import Icon from './Icon.svelte'
    import IconFa from './IconFa.svelte'
    import InputGroup from './form/InputGroup.svelte'
    import RecentCategories from './RecentCategories.svelte'
    import SearchResults from './SearchResults.svelte'

    export let bookmark
    let form

    const isVisible = (dropdown) => equals($dropdownShown, dropdown)

    function onSearchFocus () {
        $dropdownShown = 'search'
    }

    function updateCategories (results) {
        // console.debug('[CategorySelector] updateCategories:', results.length)
        $search.results = results
        $search.last = $search.query
        $dropdownShown = 'search'
    }

    async function onSubmit (event) {
        if (!form.reportValidity()) return false

        const data = Object.fromEntries(new FormData(form))
        const bookmarkFields = ['parentId', 'title', 'url']
        // console.debug('[BookmarkForm] Submitted:', data, data.subcategory)

        if (data.subcategory) {
            const newSubcategory = await createBookmark({
                parentId: data.parentId,
                title: data.subcategory,
            })
            data.parentId = newSubcategory.id
        }

        const newBookmark = await createBookmark(pick(bookmarkFields, data))
        console.info('[BookmarkForm] Bookmark saved:', newBookmark)

        window.close()
        return false
    }

    onMount(() => {
        messages.on('searchResults', updateCategories)
    })
</script>

<style>
    .btn[type=submit] {
        padding: .25rem .8rem;
    }
</style>

<form id="bookmarkForm"
      bind:this={ form }
      on:submit|preventDefault={ onSubmit }
      >
    <div class="form-group">
        <CategorySelector>
            <span slot="status">
                {#if isVisible('search') && $search.last }
                    <span class="label" title="{ t('search') }">
                        <IconFa icon="search" />
                        { $search.query }
                    </span>
                {/if}
            </span>

            <CategorySearch
                name="search"
                bind:value={ $search.query }
                on:focus={ onSearchFocus }
                />

            <DropdownToggles />
        </CategorySelector>

        <DropdownGroup>
            <Dropdown name={'search'}>
                {#if isVisible('search') && $search.last }
                    <SearchResults categories={$search.results} />
                {/if}
            </Dropdown>

            <Dropdown name={'children'}>
                <ChildCategories />
            </Dropdown>

            <Dropdown name={'recent'}>
                <RecentCategories />
            </Dropdown>
        </DropdownGroup>
    </div>

    <div class="form-group subcategory"
         class:active={ $dropdownShown === 'subcategory' }
         class:d-hide={ $dropdownShown !== 'subcategory' }
         >
        <InputGroup name="subcategory"
                    label={ t('add_subcategory') }>
            <Button name="toggleSubcategory" classes="input-group-btn">
                <Icon icon="cross" />
            </Button>
        </InputGroup>
    </div>

    <div class="form-group">
        <InputGroup name="url"
                    required="true"
                    type="url"
                    bind:value={ bookmark.url }>
            <Favicon icon={ bookmark.favIconUrl } />
        </InputGroup>
    </div>

    <div class="form-group">
        <InputGroup name="title"
                    required="true"
                    bind:value={ bookmark.title } />
    </div>

    <div class="form-group text-right buttons-row">
        <button type="submit"
                class="btn btn-primary">
            { t('buttons_add') }
        </button>
    </div>
</form>
