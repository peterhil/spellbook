// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import { Kefir } from 'kefir'

import './popup.sass'

Kefir.fromEvents(document, 'DOMContentLoaded')
  .log()
