<script>
    import { createBookmark } from '../api/bookmarks'
    import { t } from '../lib/translate'
    import { dropdownShown } from '../stores/dropdown'

    import Button from './Button.svelte'
    import CategorySelector from './CategorySelector.svelte'
    import Favicon from './Favicon.svelte'
    import Icon from './Icon.svelte'
    import InputGroup from './form/InputGroup.svelte'

    export let bookmark
    let form
    let submitButton

    const onSubmit = async (event) => {
        if (!form.reportValidity()) {
            return false
        }

        const params = {
            parentId: form.category.value,
            title: form.title.value,
            url: form.url.value,
        }
        const subcategory = form.subcategory && form.subcategory.value
        // console.debug('[BookmarkForm] Submitted:', params, subcategory)

        if (subcategory) {
            const newSubcategory = await createBookmark({
                parentId: params.parentId,
                title: subcategory,
            })

            params.parentId = newSubcategory.id
        }

        const newBookmark = await createBookmark(params)
        console.info('[BookmarkForm] Bookmark saved:', newBookmark)

        window.close()
        return false
    }
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
    <CategorySelector />

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

    <div class="form-group text-right buttons-row">
        <button type="submit"
                bind:this={submitButton}
                class="btn btn-primary">
            { t('buttons_add') }
        </button>
    </div>
</form>
