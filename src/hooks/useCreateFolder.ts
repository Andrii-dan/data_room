import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createFolder, dataRoomKeys } from '@/services'

export const useCreateFolder = (parentId: string | null = null) => {
  const qc = useQueryClient()

  return useMutation({
    ...createFolder(),
    onSuccess: () => {
      toast.success('Folder created successfully!')
      qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId) })
    },
    onError: ({ message }) => toast.error(message),
  })
}
