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
    browser = await startBrowserWithExtension(
      extensionPath,
      // 100 // slow motion
    )
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

      const headerEl = await page.waitForSelector('h1', {visible: true})
      const headerText = await headerEl.evaluate(node => node.innerText)

      assert.match(headerText, new RegExp(t('add_bookmark')))
    })

    it('has close button', async () => {
      await page.goto(url)

      const closeButtonEl = await page.waitForSelector('.btn-close', {visible: true})
      const result = await closeButtonEl.click()

      // Closing can't be tested easily:
      // Scripts may close only the windows that were opened by them
      // assert.ok(page.isClosed())
    })
  })

  describe('search', async () => {
    it('has no results', async () => {
      await page.goto(url)

      const searchInput = 'input[name=search]'
      const searchInputEl = await page.waitForSelector(searchInput, {visible: true})
      const placeholderText = await searchInputEl.evaluate(node => node.placeholder)

      assert.equal(placeholderText, t('search_placeholder'))

      await page.type(searchInput, 'Nonexisting\n')
      const searchResultsEl = await page.waitForSelector('#dropdown-search.active', {visible: true})
      const text = await searchResultsEl.evaluate(el => el.textContent)

      assert.equal(text, 'No categories found')
    })
  })
})
