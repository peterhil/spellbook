// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { fromPromise, merge } from 'kefir'
import { difference, isEmpty, pick, prop, values } from 'rambda'
import browser from 'webextension-polyfill'

import { safeHead } from '../lib/pure'
import { browserEvent$ } from './helpers'

let currentWindowId = -1

const activeTabQuery = {
    active: true,
    currentWindow: true,
}

export const isComplete = function (info) {
    return prop('status', info.change) === 'complete'
}

const isActive = prop('active')
const isSelected = prop('selected')

const isCurrentWindow = (tab) => {
    return tab.windowId === currentWindowId
}

const isCurrent = (tab) => {
    return isActive(tab) && isSelected(tab) && isCurrentWindow(tab)
}

const tabsAreEqual = (a, b) => {
    return isEmpty(difference(values(a), values(b)))
}

const getTab$ = (id) => {
    return fromPromise(browser.tabs.get(id))
}

export function getActiveTabs () {
    return browser.tabs.query({ active: true })
}

function getActiveTabOnWindow (windowId) {
    return fromPromise(
        browser.tabs.query({ windowId, active: true })
    )
        .map(safeHead)
        .filter()
}

export function getCurrentTab () {
    return browser.tabs.query(activeTabQuery)
        .then(safeHead)
}

const onActivated$ = browserEvent$(browser.tabs.onActivated)

const onFocusChanged$ = browserEvent$(browser.windows.onFocusChanged)

const onRemoved$ = browserEvent$(browser.tabs.onRemoved)
    .map((event) => {
        return {
            id: event[0],
            windowId: event[1].windowId,
            isWindowClosing: event[1].isWindowClosing,
        }
    })

const onUpdated$ = browserEvent$(browser.tabs.onUpdated)
    .map((event) => {
        return {
            id: event[0],
            change: event[1],
            tab: event[2]
        }
    })

export const tabUpdate$ = onUpdated$
    // .spy('tabUpdate$')
    .filter(event => isCurrent(event.tab))
    // .spy('tabUpdate is current')
    .map(prop('tab'))

export const tabActivation$ = onActivated$
    // .spy('tabActivation$')
    .map(prop('tabId'))
    .flatMapLatest(getTab$)

export const tabFocusChanged$ = onFocusChanged$
    // .spy('tabFocusChanged$')
    .filter(id => id >= 0)
    .onValue(id => { currentWindowId = id; return id })
    .flatMapLatest(getActiveTabOnWindow)

export const activeTab$ = merge([tabActivation$, tabFocusChanged$])

export const currentTab$ = merge([tabUpdate$, activeTab$])
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
    // .spy('currentTab$')

export const closedTab$ = onRemoved$
    .spy('closedTab$')

export const closedWindow$ = onRemoved$
    .filter(prop('isWindowClosing'))
    .map(prop('windowId'))
    .skipDuplicates()
    // .log('closedWindow$')
