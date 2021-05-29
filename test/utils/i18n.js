import fs from 'fs'
import path from 'path'

import { __dirname } from './meta.js'

function getUserLocale () {
  return Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2)
}

function getLocalizedMessages (languageCode) {
  let rawdata = ''

  try {
    rawdata = fs.readFileSync(path.resolve(__dirname, `../../src/_locales/${languageCode}/messages.json`))
  } catch (err) {
    rawdata = fs.readFileSync(path.resolve(__dirname, '../../src/_locales/en/messages.json'))
  }

  return JSON.parse(rawdata)
}

const messages = getLocalizedMessages(getUserLocale())

export function t(key) {
  return messages[key].message
}
