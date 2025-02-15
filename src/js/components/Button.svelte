<script>
    import { preventDefault } from 'svelte/legacy';

    import { messages } from '../lib/messaging'

    /**
     * @typedef {Object} Props
     * @property {any} name
     * @property {string} [kind]
     * @property {string} [classes]
     * @property {any} [title]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        name,
        kind = 'primary',
        classes = '',
        title = null,
        children
    } = $props();

    export function onClick (event) {
        // console.debug('[Button] clicked:', name)
        messages.emit('button:' + name, event)
        return false
    }
</script>

<button onclick={preventDefault(onClick)}
        class="btn btn-{kind} {classes}"
        tabindex="0"
        {title} >
    {@render children?.()}
</button>
