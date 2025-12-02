import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDialog } from '@/context'
import { useCreateFolder } from '@/hooks'

export function CreateFolder({ parentId = null }: { parentId?: string | null }) {
  const [folderName, setFolderName] = useState('')

  const { closeDialog } = useDialog()
  const { mutate, isPending } = useCreateFolder(parentId)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      { folderName, parentId },
      {
        onSuccess: () => {
          closeDialog()
          setFolderName('')
        },
      },
    )
  }

  return (
    <form onSubmit={submit}>
      <Input
        className="my-4"
        value={folderName}
        type="text"
        id="folderName"
        placeholder="Enter folder name…"
        onChange={(e) => setFolderName(e.target.value)}
        disabled={isPending}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!folderName || isPending} loading={isPending}>
          Create
        </Button>
      </div>
    </form>
  )
}
