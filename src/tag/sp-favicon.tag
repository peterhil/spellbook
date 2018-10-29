<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<sp-favicon>
  <input name="favIconUrl" ref="favIconUrl" type="hidden" value="{ opts.favicon }" class="form-input">
  <span class={ input-group-addon: true, with-icon: opts.favicon }>
    <img class="icon favicon"
      if="{ opts.favicon }"
      src="{ opts.favicon }"
      alt="{ opts.favicon }"
      title="{ opts.favicon }">
    <i class="icon icon-bookmark"
      if="{ !opts.favicon }">
    </i>
  </span>

  <style>
    sp-favicon {
      display: contents;
    }

    .input-group-addon.with-icon {
      padding: 0.15rem;
    }

    .icon.favicon {
      height: auto;
      width: 1.4rem;
    }

    .icon-bookmark {
      vertical-align: text-top;
      height: 1rem;
      width: 1rem;
    }
  </style>
</sp-favicon>
