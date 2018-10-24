// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import riot from '../dist/external/riot+compiler.js'
import test from 'ava'

test.before(t => {
  riot.tag2('test-tag', '<p>{ opts.message }</p>')
})

test.after.always(t => {
  const body = document.querySelector('body')
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
})

test('Mounting a riot tag should work', t => {
  document.querySelector('body')
    .appendChild(document.createElement('test-tag'))

  riot.mount('test-tag')

  const elem = document.querySelector('test-tag,[data-is="test-tag"] > p')
  t.truthy(elem)
})

test('Mounting a riot tag into body should work', t => {

  riot.mount('body', 'test-tag', {message: 'Ciao!'})

  const elem = document.querySelector('test-tag,[data-is="test-tag"] > p')
  t.truthy(elem)
  t.is(elem.textContent, 'Ciao!', 'Wrong message')
})
