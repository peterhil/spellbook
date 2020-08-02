import fs from 'fs'
import path from 'path'
import { __dirname } from './meta.js'

let rawdata = ''
try {
  rawdata = fs.readFileSync(path.resolve(__dirname, `../../src/_locales/${getUserLocale()}/messages.json`))
} catch (err) {
  rawdata = fs.readFileSync(path.resolve(__dirname, `../../src/_locales/en/messages.json`))
}
const messages = JSON.parse(rawdata)

export function getUserLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2)
}

export function t(key) {
  return messages[key].message
}
