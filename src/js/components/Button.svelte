<script>
    import { messages } from '../lib/messaging'

    export let name
    export let kind = 'primary'
    export let classes = ''
    export let title = null

    export function onClick (event) {
        // console.debug('[Button] clicked:', name)
        messages.emit('button:' + name, event)
        return false
    }
</script>

<button on:click|preventDefault="{onClick}"
        class="btn btn-{kind} {classes}"
        tabindex="0"
        {title} >
    <slot />
</button>
