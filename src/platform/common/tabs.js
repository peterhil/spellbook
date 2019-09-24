// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome tabs

/* global chrome */

import { difference, empty, get, head, pick, values } from 'fkit'
import Kefir from 'kefir'
import { callbackToPromise } from '../../lib/reactive'
import { browserEvent$, withErrorChecking } from './helpers'

const currentTabQuery = {
  active: true,
  currentWindow: true,
}

const isUrlChange = function (info) {
  return !!get('url', info.change)
}

export const isComplete = function (info) {
  return get('status', info.change) === 'complete'
}

const is = get
const isActive = is('active')
const isSelected = is('selected')

const isCurrent = (tab) => {
  return isActive(tab) && isSelected(tab)
}

const tabsAreEqual = (a, b) => {
  return empty(difference(values(a), values(b)))
}

const getTab = (id) => {
  return Kefir.fromPromise(callbackToPromise(withErrorChecking(chrome.tabs.get), id))
}

const getActiveTabOnWindow = (windowId) => {
  return Kefir.fromPromise(
    callbackToPromise(
      withErrorChecking(chrome.tabs.query),
      { windowId, active: true }
    )
  )
    .map(head)
    .filter()
}

export const getCurrentTab = () => {
  return callbackToPromise(withErrorChecking(chrome.tabs.query), currentTabQuery)
}

const onActivated$ = browserEvent$(chrome.tabs.onActivated)

const onFocusChanged$ = browserEvent$(chrome.windows.onFocusChanged)

const onRemoved$ = browserEvent$(chrome.tabs.onRemoved)
  .map((event) => {
    return {
      id: event[0],
      windowId: event[1].windowId,
      isWindowClosing: event[1].isWindowClosing,
    }
  })

const onUpdated$ = browserEvent$(chrome.tabs.onUpdated)
  .map((event) => {
    return {
      id: event[0],
      change: event[1],
      tab: event[2]
    }
  })

export const tabUpdate$ = onUpdated$
  .filter(event => isCurrent(event.tab) && isUrlChange(event))
  .spy('tabUpdate')
  .map(get('tab'))

export const tabActivation$ = onActivated$
  .map(get('tabId'))
  .flatMapLatest(getTab)

export const tabFocusChanged$ = onFocusChanged$
  .flatMapLatest(getActiveTabOnWindow)

export const currentTab$ = Kefir.merge([tabUpdate$, tabActivation$, tabFocusChanged$])
  .filter(isActive)
  .map(pick([
    // 'active',
    'id',
    'favIconUrl',
    // 'selected',
    // 'status',
    'title',
    'url',
    'windowId',
  ]))
  .skipDuplicates(tabsAreEqual)

export const closedTab$ = onRemoved$

export const closedWindow$ = onRemoved$
  .filter(get('isWindowClosing'))
  .map(get('windowId'))
  .skipDuplicates()
