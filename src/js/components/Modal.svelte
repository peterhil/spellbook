<script>
    import { equals } from 'rambda'
    import { dropdownShown } from '../stores/dropdown'

    export let name

    export const isVisible = equals(name)

    function onClose () {
        $dropdownShown = ''
        return false
    }
</script>

<div
    id="dropdown-{name}"
    class="modal modal-menu active"
    class:active={ isVisible($dropdownShown) }
    class:d-hide={ !isVisible($dropdownShown) }
    >
    <a
        href="#close"
        class="modal-overlay"
        aria-label="Close"
        on:click|preventDefault={onClose}
        >
    </a>
    <div class="modal-container">
        <div class="modal-header">
            <a
                href="#close"
                class="btn btn-clear float-right"
                aria-label="Close"
                on:click|preventDefault={onClose}
                >
            </a>
            <div class="modal-title">
                {name}
            </div>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>
