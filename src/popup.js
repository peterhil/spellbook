// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import { Kefir } from 'kefir'
// import { map } from 'ramda'
// import * as R from 'ramda'

// import './popup.sass'

// R.map([1, 2, 3], console.log)
Kefir.fromEvents(document, 'DOMContentLoaded')
  .log()

console.log('READY')
