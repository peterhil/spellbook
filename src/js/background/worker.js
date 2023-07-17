import browser from 'webextension-polyfill'

import { onMessage } from './common'

browser.action.setBadgeBackgroundColor({ color: '#5755d9' })

browser.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line no-console
    console.log('Extension installed')
})

browser.runtime.onMessage.addListener(onMessage)
