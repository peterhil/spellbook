import browser from 'webextension-polyfill'

import { onConnect } from './common'

browser.action.setBadgeBackgroundColor({ color: '#5755d9' })

browser.runtime.onConnect.addListener(onConnect)

browser.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line no-console
    console.log('Extension installed')
})
