import fs from 'fs'
import path from 'path'

import { __dirname } from './meta.js'

let messages = {}

setLocale('en')

export function setLocale(languageCode) {
  messages = getLocalizedMessages(languageCode)
}

export function defineBrowserLanguage (language) {
  return () => {
    Object.defineProperty(navigator, 'language', {
      get: () => language
    })

    Object.defineProperty(navigator, 'languages', {
      get: () => [languages]
    })
  }
}

export function getUserLocale () {
  return Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2)
}

function getLocalizedMessages (languageCode) {
  // try {
    const messagePath = path.resolve(__dirname, `../../src/_locales/${languageCode}/messages.json`)
    const rawdata = fs.readFileSync(messagePath)
  // } catch (err) {
  //   throw new Error('Localization not found for language:', languageCode)
  // }

  try {
    return JSON.parse(rawdata)
  } catch (err) {
    throw new Error('Failed to parse localization at:', messagePath)
  }
}

export function t (key) {
  return messages[key].message
}
