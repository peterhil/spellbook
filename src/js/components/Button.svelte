<script>
    import { messages } from '../lib/messaging'

    let {
        name,
        kind = 'primary',
        classes = '',
        title = null,
        children
    } = $props()

    export function onclick (event) {
        event.preventDefault()

        // console.debug('[Button] clicked:', name)
        messages.emit('button:' + name, event)

        return false
    }
</script>

<button class="btn btn-{kind} {classes}"
        tabindex="0"
        {onclick}
        {title}
        >
    {@render children?.()}
</button>
