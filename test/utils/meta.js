import { dirname } from 'path'
import { fileURLToPath } from 'url'

const metaUrl = import.meta.url

export const __filename = fileURLToPath(metaUrl)
export const __dirname = dirname(__filename)
