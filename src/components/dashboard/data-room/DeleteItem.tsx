import toast from 'react-hot-toast'
import { Trash, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { useDeleteItem } from '@/hooks'
import type { FileItem, FolderItem, Store } from '@/lib'

export function DeleteItem({ item }: { item: FileItem | FolderItem }) {
  const { id, type, name, parentId } = item

  const store: Store = type === 'file' ? 'files' : 'folders'

  const { closeDialog } = useDialog()

  const { mutate, isPending } = useDeleteItem(parentId)

  const deleteItem = () =>
    mutate(
      { store, id },
      {
        onSuccess: () => {
          toast.success(`Successfully removed "${name}".`)
          closeDialog()
        },
        onError: () => toast.error(`Failed to delete "${name}". Please try again.`),
      },
    )

  return (
    <div className="flex flex-col items-center gap-4">
      <span>{`Are you sure you want to delete this ${type}?`}</span>
      <span className="text-lg font-medium">{name}</span>
      <div className="mt-2 flex justify-end gap-4">
        <Button onClick={closeDialog} variant="outline">
          Cancel <X />
        </Button>
        <Button variant="destructive" loading={isPending} onClick={deleteItem}>
          Confirm <Trash />
        </Button>
      </div>
    </div>
  )
}
