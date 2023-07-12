import path, { resolve } from 'node:path'
import { readFile } from 'fs/promises'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const rel = (...args) => resolve(__dirname, ...args)

export const mode = process.env.NODE_ENV || 'development';
export const target = process.env.TARGET || 'firefox'

export const isDev = mode !== 'production';
export const outDir = isDev ? 'dev' : 'dist'

export function outputDir (dir = '') {
    return path.join(__dirname, outDir, dir)
}

export async function readJsonFile (path) {
    const file = await readFile(path)
    const object = JSON.parse(file)

    return object
}

export function urlPath (path) {
    return new URL(path, import.meta.url).pathname
}
