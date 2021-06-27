<script>
    import { t } from '../lib/translate'
    import { categorySelection as selection } from '../stores/categorySelection'

    import Button from './Button.svelte'
    import IconBi from './IconBi.svelte'
</script>

{#if $selection.id }
    <Button name="toggleChildren" classes="input-group-btn"
            title={ t('subcategories') }>
        <IconBi icon="diagram-3-fill" />
    </Button>
    <Button name="toggleSubcategory" classes="input-group-btn"
            title={ t('add_subcategory') }>
        <IconBi icon="plus-lg" />
    </Button>
{/if}
<Button name="toggleRecent" classes="input-group-btn"
        title={ t('recent_categories') }>
    <IconBi icon="clock-history" />
</Button>
