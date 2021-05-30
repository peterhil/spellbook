import assert from 'assert'

import {
  extensionUrl,
  getExtensionID,
  startBrowserWithExtension,
  setLanguage,
} from './utils/browser.js'
import {
  getUserLocale,
  setLocale,
  t,
} from './utils/i18n.js'

const extensionName = 'Spellbook'
const extensionPath = 'dev'
const path = 'popup/popup.html' // `default_popup` key of `manifest.json`

let browser = null
let page = null
let url = null
let language = 'en-US'

describe('Popup', async function () {
  // increase timeout for browser to boot and load pages
  this.timeout(20000) // mocha timeout default is 2 seconds

  before(async () => {
    browser = await startBrowserWithExtension(extensionPath)
    url = await extensionUrl('Spellbook', path, browser)
  })

  beforeEach(async () => {
    page = await browser.newPage()
    // await setLanguage(page, language)
    setLocale('fi') // or setLocale(getUserLocale())
  })

  afterEach(async () => {
    await page.close()
  })

  after(async () => {
    await browser.close()
  })

  describe('content', async () => {
    it('has header', async () => {
      await page.goto(url)

      const header = await page.waitForSelector('h1', {visible: true})
      const headerText = await header.evaluate(node => node.innerText)

      assert.match(headerText, new RegExp(t('add_bookmark')))
    })
  })

  describe('search', async () => {
    it('has placeholder', async () => {
      await page.goto(url)

      const selector = 'input[name=search]'
      const searchInput = await page.waitForSelector(selector, {visible: true})
      const searchPlaceholder = await searchInput.evaluate(node => node.placeholder)
      assert.equal(searchPlaceholder, t('search_placeholder'))

      await page.type(selector, 'Nonexisting\n')
      await page.waitFor(2000)

      const results = await page.$eval('#dropdown-search', element => element.textContent)
      assert.equal(results, 'No categories found', 'No categories message is missing')
    })
  })
})
