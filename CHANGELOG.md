# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.2] – 2021-06-09 Bug fixes and stability

Github [closed issues for v0.4.2](https://github.com/peterhil/spellbook/issues?q=is%3Aissue+is%3Aclosed+milestone%3A0.4.2)

### Fixed

#### Bugs fixed

* Fix adding subcategory with a bookmark on Firefox · [Issue #39] · [Pull request #38]
* Wrong data in popup · [Issue #31]

#### Minor fixes

- e939d9c Only use string query on Firefox when the url has about scheme
- 4d651a1 Work around Chrome bug #1213925: Tabs can not be edited/queried right now
- bf13210 Pass saved bookmark information into popup and fix popup header [Issue #56]
- 6a9f1de Adjust debounce to 400 ms on inputEvent$ and add throttle to categorySearch$ [Issue #40]
- 75a0512 Set browser action icon and badge text per tab · [Issue #36]
- 3708832 Fix errors caused by platform differences when searching
- d0a5576 Firefox: Fix creating bookmarks in new subcategories
- 365e38e Firefox: Fix errors caused by 'about:' pages
- 7809216 Fix popup header to show when a bookmark is saved
- bc1243b Fix using subcategory close button with keyboard
- 022ee1f Fix close button on popup

### Added

- Started using Github projects for [development boards](https://github.com/peterhil/spellbook/projects)
- 913bbb3 Show bookmark count on bookmark form
- 9df8570 Show badge when several bookmarks exist

### Changed

- 6eea4ef Change default shortcut to Ctrl+E (MacCtrl+E on Mac) [Issue #59]
- 970d46f Don’t clear search value when it is shorter than the minimum length
- 99902f0 Query current tab info only after popup is opened · [Issue #36]
- 2e9edb6 Change the minimum length of search back to two letters

**Technical:**

- Renamed default branch to `main`
- 36af623 Change indentation to four spaces
- e06d95b Install [pre-commit] hooks with [ESLint] and other checkers
- 3d43662 Start writing browser tests with [Puppeteer]
- Use [Rambda] instead of [Ramda] as is seems to be lighter and faster
- Use [Ramda] instead of [Fkit] as Fkit seems to be not updated anymore
- 1d8e9d8 rollup: Use absolute paths to prevent erronous destinations on copy
- 349cb6c Switch from node-sass to [Dart Sass]
- 2274c3b Get recent categories using getRecent API method
- 36cedaa Simplify message handling with generic messageBridge
- 702dd06 Start using [pnpm] instead of yarn
- 01e2b64 Replace [@riotjs/observable] with [browserify/events]

### Removed

- Removed all references to [Ava]

[Issue #56]: https://github.com/peterhil/spellbook/issues/56
[Issue #40]: https://github.com/peterhil/spellbook/issues/40
[Issue #39]: https://github.com/peterhil/spellbook/issues/39
[Issue #36]: https://github.com/peterhil/spellbook/issues/36
[Issue #31]: https://github.com/peterhil/spellbook/issues/31
[Pull request #38]: https://github.com/peterhil/spellbook/pull/38

# Released versions:

## [0.4.1] – 2019-12-22 – Fix bookmark paths

### Fixed

- Fix bookmark paths to update reactively
- Fix popup styles to avoid extra scroll bars on popup

## [0.4.0] – 2019-12-17 – Use [Svelte] instead of Riot.js

### Added

- Minify assets on production builds, and use source maps on development

### Changed

- Replace all [Riot.js] components with [Svelte] components
- Fix Mozilla extension by removing unsafe-eval from content security policy
- Increase max-height of dropdown menus
- Make dropdown menu animation faster
- Make the popup styles work better on mobile

**Technical:**

- Use separate directories for development and production builds
- Add separate bundles for the sass files
- Import [Kefir] and [fkit] using modules and remove them from globals and externals
- Simplify [Rollup] config and copy plugin usage

### Fixed

- All Mozilla web-exts errors and warnings
- All ESlint errors and warnings
- Fix when to show "No category results"
- Fix showing dropdowns so that only one of them is ever visible

### Removed

- Remove Zepto from dependencies
- Remove rollup-plugin-buble from dependencies


## [0.3.7] – 2019-11-13 – Show recent and child categories

### Added

- Show recently added categories on dropdown menu
- Show child categories on dropdown menu

### Changed

- Replace the deprecated postcss-cssnext with rollup-plugin-postcss
- Updated dependencies

### Fixed

- Ignore tab updates on background windows
- Fixed ESlint warnings
- Lots of small code improvements

### Removed

- Removed unused riotgear from dependencies


## [0.3.6] – 2019-09-23 – Add subcategories

### Added

- Ability to add bookmark into a new subcategory
- Show different icon when the current URL has been bookmarked
- Make keyboard tab focus work accross all elements on popup

### Changed

- New icon for the browser extension

### Fixed

- Fix a bug that caused favicon changes to show wrong info on popup
- Validate that title, url and category are not empty
- Prevent category menu from scrolling sideways
- Disable autocomplete on category and subcategory fields

### Removed

- Removed the button to clear the selection and search


## [0.3.5] – 2019-06-17 – Security and improved code

### Changed

- Use rollup-plugin-cpy for packaging instead of rollup-plugin-copy-glob
- Improved message passing and code organization

### Security

- Updated `js-yaml` to version 3.13.1 because of vulnerabilities


## [0.3.4] – 2018-04-21 – Localisations and usability improvements

### Added

- Russian and French localisations
- Show the search term

### Changed

**Usability improvements:**

- Close the dropdown when an item is selected
- Show the dropdown again when search field is focused and search is active
- Restrict the max width of the popup and show text overflow as ellipsis
- Make first menu item focused on tab key instead of the menu element

### Fixed

- Issue #1: Wrong page information shown on popup
- Fix TypeError on Firefox by filtering out falsy values on getActiveTabOnWindow
- Fix getting bookmark paths on the popup with Firefox v64 and newer


## [0.3.3] – 2018-10-27 – Firefox support

### Added

- Support for Firefox
- Show message when no categories match the search


## [0.3.2] – 2018-10-25 – Translations

### Added

- English and Finnish localisations

**Technical:**

- Started writing a test suite with [Ava](https://github.com/avajs/ava)


## [0.3.1] – 2018-10-23 – Ancestry

Discern between duplicate categories by showing the parent category paths. Duplicate categories have the same name.

### Added

- Show bookmark parent path on search results

### Changed

- Sort the search result categories alphabetically
- Search after typing one letter instead of two


## [0.3.0] – 2018-10-23 – Addition

First release with useful functionality.

### Added

- Enable adding bookmarks with ease
- Search categories by typing more than two letters
- Show search result categories on a dropdown
- Clear search when clicking the search or cross icon
- Keyboard navigation on the form using `Tab`, `Tab-Shift` and `Enter` keys
- Always open the popup with active tab’s URL and title – even on different windows
- Show favicon for the current page

**Technical:**

- Use message passing between background and popup
- Implemented `currentTab$` stream that reactively tells the current tab info
- Implemented `closedTab$` stream

### Changed

- Focus on the category search field when popup opens
- Close the popup when bookmark is saved

### Fixed

- Listen to window focus change events in order to update current tab info when changing windows
- Wrap Chrome API calls to check errors with function called `withErrorChecking`


## [0.2.0] – 2018-10-18 – Riot

Use a much slimmer tech stack. The package size dropped to about 300 Kb from several megabytes!

### Added

- Add keyboard shortcut for the add bookmark popup (`Ctrl-Shift-D` by default and `Ctrl-D` on a Mac)
- Show barely functional popup with the new technology stack

### Changed

- Mozilla Public License version 2.0
- Use [Riot.js] instead of [Vue.js]
- Use [Kefir.js] instead of [RxJS]
- Use [Fkit] instead of [Ramda]
- Use [Spectre.css] instead of [Semantic UI]
- Use [Bublé](https://buble.surge.sh/guide/) instead of Babel for ES2015 transpiling
- Use [Rollup] instead of [Webpack]


## 0.1.0 – 2018-10-10 – Reactivity

Introduce [Functional](https://en.wikipedia.org/wiki/Functional_reactive_programming) [Reactive Programming](https://en.wikipedia.org/wiki/Reactive_programming). This release is on a different private repository.

### Added

- Use [RxJS] to keep track of changes on the current tab (URL or title changed for example)
- Implemented searching of categories
- Show bookmark parent path on search results

### Changed

- Use [Semantic UI] instead of [Element UI]

### Removed

- Post a bookmark with Ajax to a backend called Grimoire that uses Ruby on Rails and Neo4j graph database

[Unreleased]: https://github.com/peterhil/spellbook/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/peterhil/spellbook/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/peterhil/spellbook/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/peterhil/spellbook/compare/v0.3.7...v0.4.0
[0.3.7]: https://github.com/peterhil/spellbook/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/peterhil/spellbook/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/peterhil/spellbook/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/peterhil/spellbook/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/peterhil/spellbook/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/peterhil/spellbook/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/peterhil/spellbook/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/peterhil/spellbook/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/peterhil/spellbook/compare/59dab6c...v0.2.0

[@riotjs/observable]: https://github.com/riot/observable
[Ava]: https://github.com/avajs/ava
[browserify/events]: https://github.com/browserify/events
[Bublé]: https://buble.surge.sh/guide/
[Dart Sass]: https://sass-lang.com/dart-sass
[Element UI]: https://element.eleme.io/#/en-US
[ESLint]: https://eslint.org/
[Fkit]: https://github.com/nullobject/fkit
[Kefir.js]: https://kefirjs.github.io/kefir/
[Pnpm]: https://pnpm.io/
[pre-commit]: https://pre-commit.com/
[Puppeteer]: https://pptr.dev/
[Ramda]: https://ramdajs.com/
[Rambda]: https://selfrefactor.github.io/rambda/#/
[Riot.js]: https://riot.js.org/
[Rollup]: https://rollupjs.org/guide/en
[RxJS]: https://rxjs-dev.firebaseapp.com/guide/overview
[Semantic UI]: https://semantic-ui.com/
[Spectre.css]: https://picturepan2.github.io/spectre/
[Svelte]: https://svelte.dev/
[Vue.js]: https://vuejs.org/
[Webpack]: https://webpack.js.org/
