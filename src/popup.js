// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import riot from 'riot'
import { Kefir } from 'kefir'

import './popup.sass'

riot.mount('*')

function onPopup (event) {
  // const tags = riot.mount('*')
}

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')
domStream.onValue(onPopup)
