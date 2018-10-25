<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-popup>
  <sp-popup-form bookmark="{bookmark}"></sp-popup-form>

  <script>
    import './sp-popup-form.tag'
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

    vm.on('mount', () => {
      vm.opts.messages.on('currentTabInfo', onTabUpdate)
    })

    vm.on('unmount', () => {
      vm.opts.messages.off('currentTabInfo', onTabUpdate)
    })
  </script>
</sp-popup>
