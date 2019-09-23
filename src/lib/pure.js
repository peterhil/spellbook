// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Pure utility functions

import * as F from 'fkit'

export const hasItems = array => {
  return array && !F.empty(array)
}

export const isFunction = fn => {
  return typeof fn === 'function'
}

export const choice = F.curry((selection, options) => {
  return options[selection] || options.default
})

//
// Use propertyComparator with F.sortBy or similar sort function like this:
// F.sortBy(propertyCompare('title'), list)
// This function is curried.
//
export const propertyCompare = (property, caseSensitive = true) => {
  const prop = caseSensitive
    ? F.get(property)
    : F.curry((item) => F.toLower(F.get(property, item)))

  return function comparator (a, b) {
    return prop(a) < prop(b) ? -1 : (prop(a) > prop(b) ? 1 : 0)
  }
}
