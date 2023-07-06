import { browser } from 'rosegarden'

browser.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line no-console
    console.log('Extension installed')
})
