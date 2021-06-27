// background/directory-controller.js

// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { getTree } from '../api/categories'
// import { getTree$, bookmarksModified$ } from '../api/streams'
// import { domLoaded$ } from '../lib/events'
import { sendMessage, unhandledMessage } from '../lib/messaging'
import { choice } from '../lib/pure'

// var bookmarks = []

// const updateBookmarks = function (updatedBookmarks) {
//   bookmarks = updatedBookmarks
// }

export const directoryController = {
    action: function (message, port) {
        const action = choice(message.type, {
            getAllBookmarks: (message, port) => {
                getTree().then(bookmarks => {
                    sendMessage(port, 'allBookmarksTree', bookmarks)
                })
            },
            default: unhandledMessage,
        })

        action(message, port)
    }
}

// domLoaded$
//   .flatMapLatest(getTree$)
//   .spy('[directory controller] all bookmarks tree:')
//   .observe(updateBookmarks, console.error)

// bookmarksModified$
//   .flatMapLatest(getTree$)
//   .spy('[directory controller] bookmarks modified:')
//   .observe(updateBookmarks, console.error)
