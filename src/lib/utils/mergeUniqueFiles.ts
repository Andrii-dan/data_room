import type { InvalidFile } from '../types'

// merge valid File[] by file.name — later wins
export function mergeUniqueFiles(prev: File[], next: File[]) {
  const map = new Map([...prev, ...next].map((file) => [file.name, file]))

  return [...map.values()]
}

// merge InvalidFile[] by file.name — later wins
export function mergeUniqueInvalidFiles(prev: InvalidFile[], next: InvalidFile[]) {
  const map = new Map([...prev, ...next].map((inv) => [inv.file.name, inv]))

  return [...map.values()]
}
