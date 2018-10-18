// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global document, window */

import riot from 'riot'
import Kefir from 'kefir'
import './tags/app.tag'

import './popup.sass'

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')

function onPopup (event) {
  riot.mount('app')
  return true
}

domStream.onValue(onPopup)
  .log()

// Cleanup

function onUnload (event) {
  domStream.offValue(onPopup)
  window.removeEventListener('beforeunload', onUnload)
}

// Note! This prevents browsers from using in-memory page navigation caches,
// see: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener('beforeunload', onUnload)
