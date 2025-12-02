import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDialog } from '@/context'
import { useChangeItemName } from '@/hooks'
import type { FileItem, FolderItem, Store } from '@/lib'

export function ChangeItemName({ item }: { item: FileItem | FolderItem }) {
  const { id, name, parentId, type } = item

  const [newName, setNewName] = useState(name)

  const { closeDialog } = useDialog()
  const { mutate, isPending } = useChangeItemName(parentId)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const store: Store = type === 'file' ? 'files' : 'folders'

    mutate(
      { store, id, newName },
      {
        onSuccess: () => {
          closeDialog()
          setNewName('')
        },
      },
    )
  }

  return (
    <form onSubmit={submit}>
      <Input
        className="my-4"
        value={newName}
        type="text"
        id="newName"
        onChange={(e) => setNewName(e.target.value)}
        disabled={isPending}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={newName.toLowerCase() === name.toLowerCase() || isPending}
          loading={isPending}
        >
          Confirm
        </Button>
      </div>
    </form>
  )
}
