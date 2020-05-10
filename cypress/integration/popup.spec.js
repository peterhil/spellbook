/* global beforeEach, context, cy, expect, it */

context('Loading', () => {
  beforeEach(() => {
    // cy.visit('chrome-extension://bhonmjcjlbdbkjppbghinbabbmccblfh/popup/popup.html')
    const spellbook = require('cypress-browser-extension-plugin/helpers')({ alias: 'spellbook' })
    spellbook.execCommand('pageAction', 'show', [], { returnType: 'sync' })  // => chrome.runtime.sendMessage(msg)
      .then((response) => console.log(response))
  })

  it('does nothing', () => {
    assert(true)
  })
})
