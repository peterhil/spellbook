#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'

import { chrome, firefox } from '../src/manifest.js'
import { isDev, outDir, readJsonFile, rel, target } from '../utils.config.mjs'

const isFF = target === 'firefox'
const platform = (isFF ? firefox : chrome)

const common = await readJsonFile(rel('src/manifest.json'))
const pkg = await readJsonFile(rel('package.json'))

const manifest = {
    ...common,
    author: pkg.author,
    version: pkg.version,
    ...platform,
}

const manifestFilename = isFF ? 'manifest.json' : 'manifest.json'
const manifestPath = rel(outDir, manifestFilename)
const manifestString = JSON.stringify(manifest, null, 2) + '\n'

await writeFile(manifestPath, manifestString);
console.log('Wrote manifest to: ' + manifestPath);
