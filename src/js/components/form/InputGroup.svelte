<script>
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import { equals } from 'rambda'
    import { t } from '../../lib/translate'

    /**
     * @typedef {Object} Props
     * @property {any} name
     * @property {string} [type]
     * @property {boolean} [required]
     * @property {string} [value]
     * @property {any} [title]
     * @property {string} [placeholder]
     * @property {boolean} [autocomplete]
     * @property {import('svelte').Snippet} [label]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        name,
        type = 'text',
        required = false,
        value = $bindable(''),
        title = type === 'hidden' ? '' : t(name),
        placeholder = '',
        autocomplete = true,
        label,
        children
    } = $props();

    // Handle input with two way binding of 'type':
    // https://stackoverflow.com/a/57393751/470560
    function handleInput (event) {
        const target = event.target
        const typeIs = equals(target.type)

        if (typeIs('checkbox')) {
            value = target.checked
        }
        else if (typeIs('number') || typeIs('range')) {
            value = +target.value
        }
        else {
            value = target.value
        }
    }
</script>

{#if label}
    {@render label()}
{:else}
    <label for={name}>
        { title }
    </label>
{/if}
<div class="input-group">
    <input class="form-input"
           {name}
           {value}
           {type}
           {required}
           {autocomplete}
           {placeholder}
           onchange={handleInput}
           oninput={handleInput}
           onkeydown={bubble('keydown')}
           onkeyup={bubble('keyup')}
           >
    {@render children?.()}
</div>
