import { render, fireEvent } from '@testing-library/svelte'
import { chrome } from 'sinon-chrome/extensions'
import I18nPlugin from 'sinon-chrome/plugins/i18n'

import { t as tr } from '../../src/lib/translate'
import MainCategories from '../../src/components/MainCategories.svelte'

describe('MainCategories', function () {
  const mockTranslations = {
    "add_bookmark": {"message": "Add bookmark"},
  }

  before(function () {
    global.chrome = chrome
    this.plugin = new I18nPlugin(mockTranslations)
    chrome.registerPlugin(this.plugin)
  })

  beforeEach(function () {
    chrome.flush()
  })

  after(function () {
    delete this.plugin
    chrome.flush()
    delete global.chrome
  })

  it('it works', async () => {
    const { getByText, getByTestId } = render(MainCategories)

    const add_bookmark = tr('add_bookmark')
    const add_text = getByText(add_bookmark)
    const bookmarks_bar = getByTestId('main-category-bookmarks-bar')

    await fireEvent.click(bookmarks_bar)

    expect(bookmarks_bar.textContent).toBe(add_bookmark)
  })
})
