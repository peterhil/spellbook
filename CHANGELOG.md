# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

# Released versions:

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
- Use [Kefir.js](https://kefirjs.github.io/kefir/) instead of [RxJS]
- Use [Fkit](https://nullobject.github.io/fkit/) instead of [Ramda]
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


[Unreleased]: https://github.com/peterhil/spellbook/compare/v0.3.6...HEAD
[0.3.6]: https://github.com/peterhil/spellbook/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/peterhil/spellbook/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/peterhil/spellbook/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/peterhil/spellbook/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/peterhil/spellbook/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/peterhil/spellbook/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/peterhil/spellbook/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/peterhil/spellbook/compare/59dab6c...v0.2.0

[Ava]: https://github.com/avajs/ava
[Bublé]: https://buble.surge.sh/guide/
[Element UI]: https://element.eleme.io/#/en-US
[Kefir.js]: https://kefirjs.github.io/kefir/
[Ramda]: https://ramdajs.com/
[Riot.js]: https://riot.js.org/
[Rollup]: https://rollupjs.org/guide/en
[RxJS]: https://rxjs-dev.firebaseapp.com/guide/overview
[Semantic UI]: https://semantic-ui.com/
[Spectre.css]: https://picturepan2.github.io/spectre/
[Vue.js]: https://vuejs.org/
[Webpack]: https://webpack.js.org/
