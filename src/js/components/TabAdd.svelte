<script>
    import { onMount } from 'svelte'

    import BookmarkForm from './BookmarkForm.svelte'

    import { messages } from '../lib/messaging'
    import { currentTab } from '../stores/currentTab'

    onMount(() => {
        messages.emit('api', { action: 'recentCategories' })
    })
</script>

<div class="card">
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
