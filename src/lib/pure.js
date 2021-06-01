// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Pure utility functions

import {
  compose,
  curry,
  isEmpty,
  prop,
  sortBy,
  toLower
} from 'ramda'

export const hasItems = array => {
  return array && !isEmpty(array)
}

export const isFunction = fn => {
  return typeof fn === 'function'
}

export const choice = curry((selection, options) => {
  return options[selection] || options.default
})

export const sortByTitleCaseInsensitive = sortBy(compose(toLower, prop('title')))
