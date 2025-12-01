import { useState } from 'react'
import { useParams } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDialog } from '@/context'
import { useCreateFolder } from '@/hooks'

export function CreateFolder() {
  const [folderName, setFolderName] = useState('')

  const { closeDialog } = useDialog()
  const { folderId } = useParams()
  const { mutate, isPending } = useCreateFolder(folderId)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      { folderName, parentId: folderId ?? null },
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
