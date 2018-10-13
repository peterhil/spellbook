// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import { Kefir } from 'kefir'
import * as R from 'rambda'

// import './popup.sass'

R.map(console.log, [1, 2, 3])
Kefir.fromEvents(document, 'DOMContentLoaded')
  .log()

console.log('READY')
