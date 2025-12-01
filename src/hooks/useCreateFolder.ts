import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createFolder, dataRoomKeys } from '@/services'

export const useCreateFolder = (parentId: string | null = null) => {
  const qc = useQueryClient()

  return useMutation({
    ...createFolder(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId) })
    },
    onError: ({ message }) => toast.error(message),
  })
}
