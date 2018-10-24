// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Using jsdom:
//
// https://dustinpfister.github.io/2018/01/11/nodejs-jsdom/
// https://github.com/airbnb/enzyme/issues/942#issuecomment-314715229
const jsdom = require('jsdom').JSDOM
const html = '<!doctype html><html><body></body></html>'
const dom = new jsdom(html)
const window = dom.window
const document = window.document
// or:
// const { document } = dom.window
// const window = document.defaultView

global.document = document
global.window = window
global.navigator = window.navigator
global.history = window.history
