import { downloadFile, type FileItem, getFilePreviewInfo, previewFile } from '@/lib'

import { useFileUrl } from './useFileUrl'

/**
 * Returns a handler function for previewing/downloading a file.
 */
export function useFilePreview(fileItem: FileItem | null | undefined) {
  const fileUrl = useFileUrl(fileItem)

  const { previewable, icon: FileIcon, colorClass } = getFilePreviewInfo(fileItem?.fileType)

  const handlePreview = () => {
    if (!fileItem || !fileUrl) return

    if (previewable) {
      previewFile(fileUrl)
    } else {
      downloadFile(fileUrl, fileItem.name)
    }
  }

  return { handlePreview, previewable, fileUrl, FileIcon, colorClass }
}
