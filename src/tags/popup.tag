<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup>
  <h1>Add bookmark</h1>
  <a ref="closeButton" class="btn btn-action btn-close btn-sm float-right">
    <i class="icon icon-cross"></i>
  </a>

  <popup-bookmark-form bookmark="{bookmark}"></popup-bookmark-form>

  <script>
    import './popup-bookmark-form.tag'
    import { events } from '../lib/events'
    const vm = this

    vm.bookmark = {
      'title': '',
      'url': '',
      'favIconUrl': '',
      'category': '',
    }

    const onTabUpdate = (tab) => {
      console.log('currentTabInfo from background on popup:', tab)
      vm.bookmark = tab
      vm.update()
    }

    const onClose = (event) => {
      event.preventDefault()
      window.close()
    }

    vm.on('mount', () => {
      events.add(vm.refs.closeButton, 'click', onClose)
      vm.opts.messages.on('currentTabInfo', onTabUpdate)
    })

    vm.on('unmount', () => {
      events.remove(vm.refs.closeButton, 'click', onClose)
      vm.opts.messages.off('currentTabInfo', onTabUpdate)
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

</popup>
