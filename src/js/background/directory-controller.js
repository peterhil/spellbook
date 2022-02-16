// background/directory-controller.js

// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { browser } from 'rosegarden'

// import { getTree$, bookmarksModified$ } from '../api/streams'
// import { domLoaded$ } from '../lib/events'
import { sendMessage } from '../lib/messaging'

// var bookmarks = []

// const updateBookmarks = function (updatedBookmarks) {
//   bookmarks = updatedBookmarks
// }

export const directoryController = {
    getAllBookmarks: (message, port) => {
        browser.bookmarks.getTree()
            .then(bookmarks => {
                sendMessage(port, 'allBookmarksTree', bookmarks)
            })
    },
}

// domLoaded$
//   .flatMapLatest(getTree$)
//   .spy('[directory controller] all bookmarks tree:')
//   .observe(updateBookmarks, console.error)

// bookmarksModified$
//   .flatMapLatest(getTree$)
//   .spy('[directory controller] bookmarks modified:')
//   .observe(updateBookmarks, console.error)
