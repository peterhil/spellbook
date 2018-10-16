// Copyright (c) 2018 Peter Hillerström. All rights reserved.

import F from 'fkit'
import Kefir from 'kefir'
import { isComplete, tabUpdated$ } from './lib/chrome/tabs'

tabUpdated$
  .filter(isComplete)
  .map(event => F.get('tab', event))
  .log()
