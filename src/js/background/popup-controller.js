// background/popup-controller.js

// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
    filter,
    forEach,
    map,
    pick,
    pipe,
    values,
} from 'rambda'
import ngrammy from 'ngrammy'

import { sendMessage, unhandledMessage } from '../lib/messaging'
import { choice, sortByTitleCaseInsensitive } from '../lib/pure'
import allCategories from '../stores/categories'
import { categorySearch, searchWithBookmark } from '../api/bookmarks'
import { flattenTree, getRecentCategories, getTree } from '../api/categories'
import { isCategory } from '../api/helpers'
import { bookmarksModified$ } from '../api/streams'
import { currentTab$, getActiveTabs } from '../api/tabs'

// TODO Use Svelte store!
const savedBookmarks = new Map()
const index = new ngrammy.Index(2)

export const popupController = {
    action: function (message, port) {
        const action = choice(message.type, {
            getRecentCategories: (message) => {
                getRecentCategories(5) // TODO Move hardcoded value into options
                    .then(result => {
                        sendMessage(port, 'recentCategories', result)
                    })
            },
            bookmarkStatus: (message) => {
                const result = savedBookmarks.get(message.tab.id) || []
                sendMessage(port, 'bookmarkStatus', result)
                // console.debug(
                //     '[popup controller] bookmarkStatus:', message, result, savedBookmarks
                // )
            },
            categorySearch: (message) => {
                console.debug('[popup controller] categorySearch:', message.query)

                if (index.size() > 0) {
                    const ids = index.search(message.query)
                    console.debug('[popup controller] using index')
                    const result = pick(ids, allCategories)
                    const sorted = sortByTitleCaseInsensitive(values(result))

                    sendMessage(port, 'searchResults', sorted)
                }
                else {
                    console.debug('[popup controller] using browser api')
                    categorySearch(message.query)
                        .then(result => {
                            // console.debug('[popup controller] categorySearch result:', result.length)
                            sendMessage(port, 'searchResults', result)
                        })
                }
            },
            prepareCategoryIndex: (message) => {
                if (index.size() > 0) {
                    console.debug('[popup controller] index exists already')
                }
                else {
                    console.debug('[popup controller] prepareCategoryIndex:', message)
                    // TODO Use a store!
                    getTree().then(bookmarks => {
                        // console.debug({ bookmarks })
                        const categories = pipe(
                            flattenTree,
                            filter(isCategory),
                            // sortByTitleCaseInsensitive,
                        )(bookmarks || [])

                        // console.debug({ categories })
                        // const allCategories = fromPairs(pick(['id', 'title'], categories))
                        forEach(
                            (category) => {
                                index.add(category.title, category.id)
                                allCategories[category.id] = category // TODO Use map?
                            },
                            categories
                        )

                        sendMessage(port, 'categoryIndexPrepared', {
                            // bookmarks,
                            // categories,
                            categoriesLength: categories.length,
                            indexSize: index.size(),
                        })
                    })
                }
            },
            default: unhandledMessage,
        })

        action(message)
    }
}

function setBookmarkStatus (bookmarks, tabId) {
    // console.debug('[popup controller] setBookmarkStatus:', tabId, bookmarks.length)
    const badgeText = bookmarks.length > 1
        ? bookmarks.length.toString()
        : ''
    const icon = bookmarks.length > 0
        ? '../img/spellbook_icon_bookmarked.png'
        : '../img/spellbook_icon.png'

    chrome.browserAction.setIcon({ path: icon, tabId })
    chrome.browserAction.setBadgeText({ text: badgeText, tabId })
}

async function checkBookmarkStatus (activeTab) {
    const bookmarks = await searchWithBookmark(activeTab)
    // console.debug('[popup controller] Bookmarks found:', bookmarks)

    setBookmarkStatus(bookmarks, activeTab.id)
    savedBookmarks.set(activeTab.id, bookmarks || [])

    return bookmarks
}

async function checkTabs () {
    const activeTabs = await getActiveTabs()
    // console.debug('[popup controller] active tabs:', activeTabs)

    // Clear saved bookmarks cache when bookmarks are modified
    savedBookmarks.clear()

    return await map(checkBookmarkStatus, activeTabs)
}

currentTab$
    // .spy('[popup controller] current tab changed:')
    .observe(checkBookmarkStatus)

bookmarksModified$
    // .spy('[popup controller] bookmarks modified:')
    .observe(checkTabs)
