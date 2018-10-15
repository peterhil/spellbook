<app>
  <h1>Add bookmark</h1>
  <a ref="closeButton" class="btn btn-action btn-close btn-sm float-right">
    <i class="icon icon-cross"></i>
  </a>

  <popup-bookmark-form></popup-bookmark-form>

  <script>
    import './popup-bookmark-form.tag'
    import { events } from '../lib/events'
    const vm = this

    function onClose (event) {
      event.preventDefault()
      window.close()
    }

    vm.on('mount', () => {
      events.add(vm.refs.closeButton, 'click', onClose)
    })

    vm.on('unmount', () => {
      events.remove(vm.refs.closeButton, 'click', onClose)
    })
  </script>

  <style>
    :scope {
      --riot-color: #333;
      display: block;
    }

    h1 {
      color: var(--riot-color);
    }

    .btn-close {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      z-index: 999;
    }
  </style>

</app>
