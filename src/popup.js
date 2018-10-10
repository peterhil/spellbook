// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import Kefir from './vendor/kefir/dist/kefir.js'
// import map from './vendor/ramda/dist/ramda.js'
// import * as R from './vendor/ramda/dist/ramda.js'

// import './popup.sass'

// R.map([1, 2, 3], console.log)
Kefir.fromEvents(document, 'DOMContentLoaded')
  .log()

console.log('READY')
