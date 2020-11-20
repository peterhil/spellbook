<script>
  import { messages } from '../lib/messaging'

  export let classes
  export let name

  export function onClick (event) {
    console.debug('Button clicked:', name)
    messages.emit('button:' + name, event)
    return false
  }
</script>

<button on:click|preventDefault="{onClick}" class="btn btn-primary {$$props.classes}" tabindex="0">
  <slot />
</button>
