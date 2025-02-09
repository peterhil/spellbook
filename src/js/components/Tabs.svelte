<script>
    export let tabs
    export let active = {}

    function activate (tab) {
        active = tab
    }
</script>

<ul class="tab tab-block">
    {#each tabs as tab}
        <li class="tab-item" class:active={ active.id === tab.id }>
            <a href="#{ tab.id }"
               on:click|preventDefault={ () => activate(tab) }
               >
                { tab.label }
            </a>
        </li>
    {/each}
</ul>
