// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome tabs

/* global chrome */

import F from 'fkit'
import Kefir from 'kefir'
import { fromEventPattern } from '../util/reactive'
import { callbackToPromise } from '../util'

const isUrlChange = function (info) {
  return !!F.getIn(['change', 'url'], info)
}

const isComplete = function (info) {
  return F.getIn(['change', 'status'], info) === 'complete'
}

const is = F.get
const isActive = is('active')
const isSelected = is('selected')

const isCurrent = (tab) => {
  return isActive(tab) && isSelected(tab)
}

const getTab = (id) => {
  return Kefir.fromPromise(callbackToPromise(chrome.tabs.get, id))
}

const onActivated$ = fromEventPattern(
  chrome.tabs.onActivated.addListener.bind(chrome.tabs.onActivated),
  chrome.tabs.onActivated.removeListener.bind(chrome.tabs.onActivated),
)

const onUpdated$ = fromEventPattern(
  chrome.tabs.onUpdated.addListener.bind(chrome.tabs.onUpdated),
  chrome.tabs.onUpdated.removeListener.bind(chrome.tabs.onUpdated),
)
  .map((event) => {
    return {
      id: event[0],
      change: event[1],
      tab: event[2]
    }
  })

export const tabUpdate$ = onUpdated$
  .map(F.get('tab'))

export const tabActivation$ = onActivated$
  .map(F.get('tabId'))
  .flatMapLatest(getTab)

export const currentTab$ = Kefir.merge([tabUpdate$, tabActivation$])
  .filter(isActive)
  .map(F.pick([
    // 'active',
    'id',
    'favIconUrl',
    // 'selected',
    // 'status',
    'title',
    'url',
    // 'windowId',
  ]))
  .skipDuplicates((a, b) => F.empty(F.difference(F.values(a), F.values(b))))
