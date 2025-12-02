import { useEffect, useMemo } from 'react'

import type { FileItem } from '@/lib'

/**
 * Generates a temporary browser URL for a FileItem's Blob
 * and automatically revokes it when the component unmounts or file changes.
 */
export function useFileUrl(fileItem: FileItem | null | undefined): string | null {
  const url = useMemo(() => {
    if (!fileItem) return null
    return URL.createObjectURL(fileItem.file)
  }, [fileItem])

  // Cleanup when fileItem changes or unmount
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
