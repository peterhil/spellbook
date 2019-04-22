<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<sp-directory>
  <div class="view">
    <sp-directory-header></sp-directory-header>

    <div class="directory">
      <div class="panel left-pane">
        <div class="panel-header">
          <div class="panel-title">{ t('category') }</div>
        </div>
        <div class="panel-body">
          <ul class="menu" aria-role="menu" tabindex="-1">
            <sp-main-categories></sp-main-categories>
            <li class="divider"></li>
            <sp-category-list categories="{ categories }"></sp-category-list>
          </ul>
        </div>
        <div class="panel-footer">
        </div>
      </div>

      <div class="panel right-pane">
        <div class="panel-header">
          <div class="panel-title">Bookmarks</div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .view {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .directory {
      position: absolute;
      display: flex;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .left-pane {
      overflow: scroll;
      resize: horizontal;
    }

    .right-pane {
      width: auto;
      flex: auto;
    }

    .panel {
      border: none;
    }

    .panel-header {
      background-color: #333;
    }

    .panel-title {
      color: #eee;
    }

    .panel .panel-body {
      padding: 0 .4rem;
    }

    .panel .menu {
      padding: 0;
      box-shadow: none;
    }
  </style>

  <script>
    import F from 'fkit'
    import Kefir from 'kefir'
    import { propertyCompare } from '../lib/pure'
    import { t } from '../lib/translate'
    import { getBookmark, getTree, filterCategories, flattenTree } from '../platform/common/bookmarks.js'
    import '../tag/sp-category-list.tag'
    import '../tag/sp-main-categories.tag'
    import './sp-directory-header.tag'
    const vm = this

    vm.t = t

    const categories$ = Kefir
      .fromPromise(getTree())
      .map(flattenTree)
      .map(filterCategories)
      .map(F.sortBy(propertyCompare('title', false)))
      .spy('Directory tag: categories$')

    const updateCategories = (categories) => {
      console.debug('updateCategories:', categories)
      vm.categories = categories
      vm.update()
    }

    vm.on('mount', () => {
      categories$.observe(updateCategories, console.error)
    })
  </script>
</sp-directory>
