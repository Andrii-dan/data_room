import type { FileItem } from '@/lib'

import { useFileUrl } from './useFileUrl'

/**
 * Returns a handler function for previewing/downloading a file.
 */
export function useFilePreview(fileItem: FileItem | null | undefined) {
  const fileUrl = useFileUrl(fileItem)

  const previewable = fileItem
    ? fileItem.fileType.startsWith('image/') ||
      fileItem.fileType === 'application/pdf' ||
      fileItem.fileType.startsWith('text/')
    : false

  const handlePreview = () => {
    if (!fileItem || !fileUrl) return

    if (previewable) {
      // Open in a new tab
      window.open(fileUrl, '_blank')
    } else {
      // Trigger download
      const a = document.createElement('a')
      a.href = fileUrl
      a.download = fileItem.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return { handlePreview, previewable, fileUrl }
}
