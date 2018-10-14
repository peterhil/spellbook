// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import riot from 'riot'
import Kefir from 'kefir'
import './tags/app.tag'
import './tags/timer.tag'
import './greeting'

import './popup.sass'

function onPopup (event) {
  riot.mount('*')
  return true
}

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')
domStream.onValue(onPopup)
  .log()
