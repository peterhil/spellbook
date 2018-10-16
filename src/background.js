// Copyright (c) 2018 Peter Hillerström. All rights reserved.

/* global document */

import Kefir from 'kefir'
import { tabUpdateCompleted$ } from './lib/chrome/tabs'

tabUpdateCompleted$
  .log()
