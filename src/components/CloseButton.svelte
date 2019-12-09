<script>
  export const onClose = window.close
</script>

<button on:click|preventDefault="{onClose}" class="btn btn-action btn-close btn-sm float-right" tabindex="0">
  <i class="icon icon-cross"></i>
</button>

<style>
  .btn-close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 999;
  }
</style>
