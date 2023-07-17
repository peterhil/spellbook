// Polyfills for handling manifest V2 vs V3 API differences

import browser from 'webextension-polyfill'

export const browserAction = browser.action || browser.browserAction
