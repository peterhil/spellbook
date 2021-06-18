<script>
    import { equals } from 'rambda'
    import { t } from '../../lib/translate'

    export let name
    export let type = 'text'
    export let required = false
    export let value = ''

    export let label = t(name)
    export let autocomplete = 'off' // true
    export let placeholder = label

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

<label for={name}>
    { label }
</label>
<div class="input-group">
    <input class="form-input"
           {name}
           {value}
           {type}
           {required}
           {autocomplete}
           {placeholder}
           on:change={handleInput}
           on:input={handleInput}
           >
    <slot></slot>
</div>
