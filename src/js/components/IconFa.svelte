<script>
    /**
     * @typedef {Object} Props
     * @property {string} [icon]
     */

    /** @type {Props} */
    let { icon = 'times' } = $props();
</script>

<i class="icon fas fa-{icon}"></i>
