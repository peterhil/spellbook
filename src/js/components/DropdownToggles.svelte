<script>
    import { t } from '../lib/translate'
    import { categorySelection as selection } from '../stores/categorySelection'

    import Button from './Button.svelte'
    import Icon from './Icon.svelte'
    import IconFa from './IconFa.svelte'
</script>

<div class:d-hide={ !$selection.id } class="input-group">
    <Button name="toggleChildren" classes="input-group-btn"
            title={ t('subcategories') }>
        <IconFa icon="sitemap" />
    </Button>
    <Button name="toggleSubcategory" classes="input-group-btn"
            title={ t('add_subcategory') }>
        <Icon icon="plus" />
    </Button>
</div>
<Button name="toggleRecent" classes="input-group-btn"
        title={ t('recent_categories') }>
    <IconFa icon="history" />
</Button>
