// Chrome tabs

/* global chrome */

import Kefir from 'kefir'
import { fromEventPattern } from '../util/reactive'

export const isUrlChange = function (info) {
  return info && info.change.hasOwnProperty('url')
}

export const isComplete = function (info) {
  return info && info.change.hasOwnProperty('status') && info.change.status === 'complete'
}

export const tabUpdated$ = fromEventPattern(
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
