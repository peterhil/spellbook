<script>
    import browser from 'webextension-polyfill'
    import { equals, pick } from 'rambda'
    import { onMount } from 'svelte'

    import { messages } from '../lib/messaging'
    import { humanizeDate, t } from '../lib/translate'
    import { dropdownShown } from '../stores/dropdown'
    import { search } from '../stores/search'

    import Button from './Button.svelte'
    import CategorySearch from './CategorySearch.svelte'
    import CategorySelector from './CategorySelector.svelte'
    import ChildCategories from './ChildCategories.svelte'
    import Modal from './Modal.svelte'
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
        // console.debug('[CategorySelector] onSearchFocus')
        $dropdownShown = 'search'
    }

    function updateCategories (results) {
        console.debug('[CategorySelector] updateCategories:', results.length)
        $search.results = results
        $search.last = $search.query
        $dropdownShown = 'search'
    }

    function preventEnter (event) {
        // console.debug('preventEnter:', event)

        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()

            return true
        }

        return false
    }

    async function onSubmit (event) {
        if (!form.reportValidity()) return false

        const data = Object.fromEntries(new FormData(form))
        const bookmarkFields = ['parentId', 'title', 'url']
        // console.debug('[BookmarkForm] Submitted:', data, data.subcategory)

        if (data.subcategory) {
            const newSubcategory = await browser.bookmarks.create({
                parentId: data.parentId,
                title: data.subcategory,
            })
            data.parentId = newSubcategory.id
        }

        const newBookmark = await browser.bookmarks.create(pick(bookmarkFields, data))
        console.info('[BookmarkForm] Bookmark saved:', newBookmark)

        return false
    }

    onMount(() => {
        messages.on('categorySearch', updateCategories)
    })
</script>

<form class="bookmark-form"
      bind:this={ form }
      on:submit|preventDefault={ onSubmit }
      >
    {#if bookmark.dateAdded }
    <p>{ t('added') }: { humanizeDate(bookmark.dateAdded) }</p>
    {/if}
    {#if bookmark.parentId }
    <p>{ t('category') }: { bookmark.parentId }</p>
    {/if}

    <div class="form-group">
        <CategorySelector>
            <span slot="status">
                {#if $search.last }
                    <span class="label" title="{ t('search') }">
                        <IconFa icon="search" />
                        { $search.last }
                    </span>
                {/if}
            </span>

            <CategorySearch on:focus={ onSearchFocus } />

            <DropdownToggles />
        </CategorySelector>
    </div>

    <div class="form-group subcategory"
         class:active={ $dropdownShown === 'subcategory' }
         class:d-hide={ $dropdownShown !== 'subcategory' }
         >
        <InputGroup name="subcategory"
                    label={ t('add_subcategory') }
                    on:keydown={preventEnter}>
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
