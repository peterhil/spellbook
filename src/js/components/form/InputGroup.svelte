<script>
    import { equals } from 'rambda'

    let {
        children,
        name,
        type = 'text',
        required = false,
        value = '',
        placeholder = '',
        autocomplete = true,
    } = $props()

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
           onkeydown={handleInput}
           onkeyup={handleInput}
           >
    {@render children?.()}
</div>
