# Spellbook

Spellbook is a bookmark manager extension for Chrome.

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

Then add the `dist` directory as unpacked extension to Chrome or compatible browser.
