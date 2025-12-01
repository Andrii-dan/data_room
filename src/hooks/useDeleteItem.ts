import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dataRoomKeys, removeItem } from '@/services'

export const useDeleteItem = (parentId: string | null) => {
  const qc = useQueryClient()

  return useMutation({
    ...removeItem(),
    onSuccess: () => qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId) }),
    onError: ({ message }) => toast.error(message),
  })
}
