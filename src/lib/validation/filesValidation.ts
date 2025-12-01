import { formatFileSize, type InvalidFile, MAX_FILE_SIZE } from '@/lib'

export function validateFiles(incoming: File[]) {
  const valid: File[] = []
  const invalid: InvalidFile[] = []

  incoming.forEach((file) => {
    if (file.size === 0) {
      invalid.push({
        file,
        reason: 'File is empty.',
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      invalid.push({
        file,
        reason: `Exceeds the maximum size of ${formatFileSize(MAX_FILE_SIZE)}.`,
      })
      return
    }

    valid.push(file)
  })

  return { valid, invalid }
}
