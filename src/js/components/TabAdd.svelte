<script>
    import BookmarkForm from './BookmarkForm.svelte'

    import { currentTab } from '../stores/currentTab'
</script>

<div class="card">
    <div class="card-body">
        <BookmarkForm bookmark={ $currentTab } />
    </div>
</div>
