<script>
    import { t } from '../lib/translate'
    import { categorySelection as selection } from '../stores/categorySelection'

    import Button from './Button.svelte'
    import IconNoir from './IconNoir.svelte'
</script>

{#if $selection.id }
    <Button name="toggleChildren" classes="input-group-btn"
            title={ t('subcategories') }>
        <IconNoir icon="network-alt" />
    </Button>
    <Button name="toggleSubcategory" classes="input-group-btn"
            title={ t('add_subcategory') }>
        <IconNoir icon="plus" />
    </Button>
{/if}
<Button name="toggleRecent" classes="input-group-btn"
        title={ t('recent_categories') }>
    <IconNoir icon="timer" />
</Button>
