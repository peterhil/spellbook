// lib/translate.js

// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

export const t = browser.i18n.getMessage

export function humanizeDate (
    date,
    locale = browser.i18n.getUILanguage(),
    options = { dateStyle: 'full' }
) {
    const localeDate = new Intl.DateTimeFormat(locale, options)

    return localeDate.format(new Date(date))
}
