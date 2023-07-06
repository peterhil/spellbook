import path, { resolve } from 'node:path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const rel = (...args) => resolve(__dirname, ...args)

export const mode = process.env.NODE_ENV || 'development';
export const isDev = mode !== 'production';

export function outputDir (dir = '') {
    return path.join(__dirname, (isDev ? 'dev' : 'dist'), dir)
}

export function urlPath (path) {
    return new URL(path, import.meta.url).pathname
}
