# Spellbook

![](src/asset/spellbook_icon_bookmarked.png)

Spellbook is a browser extension for easily managing thousands of bookmarks
with novel UI innovations.

## Installation

Get it now for
[Google Chrome](https://chrome.google.com/webstore/detail/spellbook/mpngjgnmljpfedcllnndbeeponjdjcnk)
or
[Mozilla Firefox](https://addons.mozilla.org/fi/firefox/addon/spellbook-peterhil/).


## Unpacked installation

```
yarn install
yarn run build
```

Then add the `dist` directory as [unpacked extension to Chrome](https://developer.chrome.com/extensions/getstarted#manifest) or compatible browser.

## Development

```
yarn install
yarn run dev
```

Then add the `dev` directory as [unpacked extension to Chrome](https://developer.chrome.com/extensions/getstarted#manifest) or compatible browser.

## Technology stack

Currently I am using libraries that are well written and most importantly
extremely small in size.

For now the stack is:

- [Svelte • Cybernetically enhanced web apps](https://svelte.dev/)
- [Kefir.js — fast and light Reactive Programming library for JavaScript inspired by Bacon.js and RxJS](https://kefirjs.github.io/kefir/)
- [nullobject/fkit: A functional programming toolkit for JavaScript](https://github.com/nullobject/fkit) – [FKit API documentation](https://nullobject.github.io/fkit/api.html)
- [Spectre.css - A Lightweight, Responsive and Modern CSS Framework](https://picturepan2.github.io/spectre/)
- [ESLint - Pluggable JavaScript linter](https://eslint.org/)
- [rollup.js](https://rollupjs.org/guide/en)

## Licensing

Copyright © 2018–2019 Peter Hillerström and contributors

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a [copy of the MPL](https://github.com/peterhil/spellbook/blob/master/LICENSE.txt) was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).

### Other licenses

- The [lib/rxjs.js](https://github.com/peterhil/spellbook/blob/master/src/lib/rxjs.js) file implements `fromEventPattern` function from RxJS in Kefir and is licensed under [Apache Software License](http://www.apache.org/licenses/LICENSE-2.0).
