<script>
    /**
     * @typedef {Object} Props
     * @property {string} [icon]
     */

    /** @type {Props} */
    let { icon = 'cross' } = $props();
</script>

<i class="icon icon-{icon}"></i>
