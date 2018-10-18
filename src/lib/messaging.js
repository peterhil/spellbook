// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

export function disconnectionHandler (port) {
  if (chrome.runtime.lastError) {
    console.error('Connection error:', chrome.runtime.lastError)
    return
  }

  if (port) {
    console.log('Disconnected:', port.name)
  } else {
    console.log('Other end disconnected - wonder why?')
  }
}
