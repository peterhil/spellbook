// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import riot from 'riot'
import { Kefir } from 'kefir'
import { timer } from './timer'
import { greeting } from './greeting'

import './popup.sass'


function onPopup (event) {
  return riot.mount('*')
}

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')
domStream.onValue(onPopup)
  .log()
