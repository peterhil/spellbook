<script>
    import { preventDefault } from 'svelte/legacy';

    let { tabs, active = $bindable({}) } = $props();

    function activate (tab) {
        active = tab
    }
</script>

<ul class="tab tab-block">
    {#each tabs as tab}
        <li class="tab-item" class:active={ active.id === tab.id }>
            <a href="#{ tab.id }"
               onclick={preventDefault(() => activate(tab))}
               >
                { tab.label }
            </a>
        </li>
    {/each}
</ul>
