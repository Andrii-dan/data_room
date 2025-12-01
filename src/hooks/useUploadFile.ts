import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dataRoomKeys, uploadFile } from '@/services'

export const useUploadFile = (parentId: string | null) => {
  const qc = useQueryClient()

  return useMutation({
    ...uploadFile(),
    onSuccess: () => qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId) }),
    onError: ({ message }) => toast.error(message),
  })
}
