// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import riot from '../dist/ext/riot+compiler.js'
import test from 'ava'
import { $createElement, $q } from './utils/dom'

test.before(t => {
  riot.tag2('test-tag', '<p>{ opts.message }</p>')
})

test.after.always(t => {
  const body = ('body')
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
})

test('Mounting a riot tag should work', t => {
  $q('body').appendChild($createElement('test-tag'))

  riot.mount('test-tag')

  const elem = $q('test-tag > p')
  t.truthy(elem)
})

test('Mounting a riot tag into body should work', t => {

  riot.mount('body', 'test-tag', {message: 'Ciao!'})

  const elem = $q('test-tag,[data-is="test-tag"] > p')
  t.truthy(elem)
  t.is(elem.textContent, 'Ciao!', 'Wrong message')
})
