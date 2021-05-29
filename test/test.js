import puppeteer from 'puppeteer'
import assert from 'assert'
import { t } from './utils/i18n.js'

const extensionPath = 'dev'
const language = 'en-US'
let page = null
let browser = null

describe('Popup', function () {
  this.timeout(20000) // default is 2 seconds which may not be enough to boot browser and pages

  before(boot)

  describe('Search', async function () {
    it('Searching without a match', async function () {
      const inputElement = await page.$('input[name=search]')
      assert.equal(inputElement, t('search_placeholder'))

      await page.type('input[name=search]', 'Nonexisting\n')
      await page.waitFor(2000)

      const results = await page.$eval('#dropdown-search', element => element.textContent)
      assert.equal(results, 'No categories found', 'No categories message is missing')
    })
  })

  after(shutdown)
})

async function getExtensionID (extensionName, browser) {
  // This wait time is for background script to boot.
  // This is completely an arbitrary one.
  // const dummyPage = await browser.newPage()
  // await dummyPage.waitFor(2000) // arbitrary wait time.
  const targets = await browser.targets()

  const backgroundPageTarget = targets.find(target => target.type() === 'background_page')
  const backgroundPageUrl = backgroundPageTarget.url()
  const [,, extensionID] = backgroundPageUrl.split('/')

  return extensionID
}

function defineBrowserLanguage (language) {
  return () => {
    Object.defineProperty(navigator, 'language', {
      get: () => language
    })

    Object.defineProperty(navigator, 'languages', {
      get: () => [languages]
    })
  }
}

async function boot () {
  browser = await puppeteer.launch({
    headless: false, // Extensions in Chrome currently only work in non-headless mode
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      `--lang=${language}`,
    ]
  })

  page = await browser.newPage()

  await page.setExtraHTTPHeaders({
    'Accept-Language': language
   })

  await page.evaluateOnNewDocument(
    defineBrowserLanguage(language)
  )

  const extensionName = 'Spellbook'
  const extensionID = await getExtensionID(extensionName, browser)
  const extensionPopupHtml = 'popup/popup.html'  // `default_popup` key of `manifest.json`

  await page.goto(`chrome-extension://${extensionID}/${extensionPopupHtml}`)
}

async function shutdown () {
  await page.close()
  await browser.close()
}
