// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const riot = require('riot')

import test from 'ava'
import '../../src/tag/sp-favicon.tag'

test('Render with placeholder icon', t => {
  const html = riot.render('sp-favicon')
  t.snapshot(html)
})

test('Render with favicon', t => {
  const html = riot.render('sp-favicon', {favicon: 'https://en.wikipedia.org/favicon.ico'})
  t.snapshot(html)
})
