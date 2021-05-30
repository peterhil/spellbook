import puppeteer from 'puppeteer'

import { defineBrowserLanguage } from './i18n.js'

export async function extensionUrl (extensionName, path, browser) {
  const extensionID = await getExtensionID(extensionName, browser)
  const url = `chrome-extension://${extensionID}/${path}`

  return url
}

export async function getBackgroundPage (extensionName, browser) {
  const targets = await browser.targets()
  const background = targets.find(target => {
    return target.type() === 'background_page'
      && target._targetInfo.title === extensionName
  })

  return background
}

export async function getExtensionID (extensionName, browser) {
  const backgroundPageTarget = await getBackgroundPage(extensionName, browser)
  const backgroundPageUrl = backgroundPageTarget.url()
  const [,, extensionID] = backgroundPageUrl.split('/')

  return extensionID
}

export async function startBrowserWithExtension (
  extensionPath,
  language = 'en-US',
  headless = false,  // Extensions in Chrome currently only work in non-headless mode
) {
  return await puppeteer.launch({
    headless,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      `--lang=${language}`,
    ]
  })
}

export async function setLanguage (page, language) {
  await page.setExtraHTTPHeaders({
    'Accept-Language': language
  })

  await page.evaluateOnNewDocument(
    defineBrowserLanguage(language)
  )
}
