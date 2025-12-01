import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dataRoomKeys, uploadFile } from '@/services'

interface UploadFileHook {
  isUploading: boolean
  uploadFiles: (files: File[], onSuccess?: VoidFunction) => Promise<void>
}

export const useUploadFile = (parentId: string | null = null): UploadFileHook => {
  const qc = useQueryClient()
  const [isUploading, setIsUploading] = useState(false)

  const mutation = useMutation(uploadFile())

  const uploadFiles = async (files: File[], onSuccess?: VoidFunction) => {
    if (!files.length) return

    setIsUploading(true)
    try {
      const results = await Promise.allSettled(
        files.map((file) => mutation.mutateAsync({ file, parentId })),
      )

      const rejected = results.filter((r) => r.status === 'rejected')
      const fulfilled = results.filter((r) => r.status === 'fulfilled')

      // Invalidate queries if at least one succeeded
      if (fulfilled.length) {
        qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId ?? null) })
      }

      if (rejected.length) {
        toast.error(`${rejected.length} file(s) failed to upload`)
      } else {
        toast.success('All files uploaded successfully!')
        onSuccess?.()
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to upload files')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return { isUploading, uploadFiles }
}
