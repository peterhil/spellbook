import path, { resolve } from 'node:path'

export const rel = (...args: string[]) => resolve(__dirname, ...args)

export const mode = process.env.NODE_ENV || 'development';
export const isDev = mode !== 'production';

export function outputDir (dir = '') {
    return path.join(__dirname, (isDev ? 'dev' : 'dist'), dir)
}

export function urlPath (path) {
    return new URL(path, import.meta.url).pathname
}
