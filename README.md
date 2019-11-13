# Spellbook

![](src/asset/spellbook_icon_bookmarked.png)

Spellbook is a bookmark manager extension for Chrome and Firefox web browsers.

Get it now from [Chrome Web Store](https://chrome.google.com/webstore/detail/spellbook/mpngjgnmljpfedcllnndbeeponjdjcnk) or [Mozilla Addons](https://addons.mozilla.org/fi/firefox/addon/spellbook-riot/).

It is still in early development phase, but the motivation is to make a really
usable extension that enables the user to easily manage thousands of bookmarks
with novel UI innovations.

## Technology stack

Currently I am to only use libraries that are well written and most importantly
extremely small in size.

For now the stack is:

- [Riot.js — Simple and elegant component-based UI library](https://riot.js.org/)
- [Kefir.js — fast and light Reactive Programming library for JavaScript inspired by Bacon.js and RxJS](https://kefirjs.github.io/kefir/)
- [nullobject/fkit: A functional programming toolkit for JavaScript](https://github.com/nullobject/fkit) – [FKit API documentation](https://nullobject.github.io/fkit/api.html)
- [Spectre.css - A Lightweight, Responsive and Modern CSS Framework](https://picturepan2.github.io/spectre/)
- [ESLint - Pluggable JavaScript linter](https://eslint.org/)
- [Bublé – the blazing fast, batteries-included ES2015 compiler](https://buble.surge.sh/guide/)
- [PostCSS - a tool for transforming CSS with JavaScript](https://postcss.org/)
- [rollup.js](https://rollupjs.org/guide/en)

## Installation

```
yarn
rollup -c
```

Then add the `dist` directory as [unpacked extension to Chrome](https://developer.chrome.com/extensions/getstarted#manifest) or compatible browser.

## Development

### Running tests

Run all tests:

`ava` or `yarn test`

Run a single test:

`ava test/riot-setup.test.js`

All commands accept `--verbose`, `-v`, `--watch`, and `-w` flags.

## Licensing

Copyright © 2018 Peter Hillerström and contributors

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a [copy of the MPL](https://github.com/peterhil/spellbook/blob/master/LICENSE.txt) was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).

### Other licenses

- The [lib/rxjs.js](https://github.com/peterhil/spellbook/blob/master/src/lib/rxjs.js) file implements `fromEventPattern` function from RxJS in Kefir and is licensed under [Apache Software License](http://www.apache.org/licenses/LICENSE-2.0).
