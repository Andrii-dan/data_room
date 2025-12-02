import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { changeItemName, dataRoomKeys } from '@/services'

export function useChangeItemName(parentId: string | null) {
  const qc = useQueryClient()

  return useMutation({
    ...changeItemName(),
    onSuccess: () => {
      toast.success('Item renamed successfully!')
      qc.invalidateQueries({ queryKey: dataRoomKeys.items(parentId) })
    },
    onError: ({ message }) => toast.error(message),
  })
}
