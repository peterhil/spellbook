// test.js

import puppeteer from 'puppeteer'
import assert from 'assert'
import { t } from './utils/i18n.js'

const extensionPath = 'dev'
const lang = 'en-US'
let extensionPage = null
let browser = null

describe('Popup', function() {
  this.timeout(20000) // default is 2 seconds and that may not be enough to boot browsers and pages.

  before(async function() {
    await boot()
  })

  describe('Search', async function() {
    it('Searching without a match', async function() {
      const inputElement = await extensionPage.$('input[name=search]')
      assert.equal(inputElement, t("search_placeholder"))

      await extensionPage.type('input[name=search]', "Nonexisting\n")
      await extensionPage.waitFor(2000)

      const results = await extensionPage.$eval('#dropdown-search', element => element.textContent)
      assert.equal(results, 'No categories found', 'No categories message is missing')
    })
  })

  after(async function() {
    await browser.close()
  })
})

async function getExtensionID(extensionName, browser) {
  // This wait time is for background script to boot.
  // This is completely an arbitrary one.
  // const dummyPage = await browser.newPage()
  // await dummyPage.waitFor(2000) // arbitrary wait time.

  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');

  const backgroundPageUrl =  backgroundPageTarget.url() || ''
  const [,, extensionID] = backgroundPageUrl.split('/')

  return extensionID
}

async function boot () {
  browser = await puppeteer.launch({
    headless: false, // Extensions in Chrome currently only work in non-headless mode
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      `--lang=${lang}`,
    ]
  })

  const extensionName = 'Spellbook'
  let extensionID = await getExtensionID(extensionName, browser)

  // This is the page mentioned in `default_popup` key of `manifest.json`
  const extensionPopupHtml = 'popup/popup.html'

  extensionPage = await browser.newPage();
  await extensionPage.setExtraHTTPHeaders({
    'Accept-Language': lang
  });

  await extensionPage.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "language", {
        get: function() {
            return lang
        }
    })
    Object.defineProperty(navigator, "languages", {
        get: function() {
            return [lang]
        }
    })
  })

  await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHtml}`);
}
