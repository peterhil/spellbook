// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Pure utility functions

import { curry, empty, get, toLower } from 'fkit'

export const hasItems = array => {
  return array && !empty(array)
}

export const isFunction = fn => {
  return typeof fn === 'function'
}

export const choice = curry((selection, options) => {
  return options[selection] || options.default
})

export const filterBy = curry((fn, items) => {
  return items.filter(fn)
})

//
// Use propertyComparator with sortBy or similar sort function like this:
// sortBy(propertyCompare('title'), list)
// This function is curried.
//
export const propertyCompare = (property, caseInsensitive = false) => {
  const prop = (caseInsensitive === false)
    ? get(property)
    : curry((item) => toLower(get(property, item)))

  return function comparator (a, b) {
    return prop(a) < prop(b) ? -1 : (prop(a) > prop(b) ? 1 : 0)
  }
}
