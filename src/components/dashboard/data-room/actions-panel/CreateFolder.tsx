import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDialog } from '@/context'
import { useCreateFolder } from '@/hooks'
import { PATHS } from '@/lib'

export function CreateFolder({ parentId = null }: { parentId?: string | null }) {
  const [folderName, setFolderName] = useState('')

  const navigate = useNavigate()

  const { closeDialog } = useDialog()
  const { mutate, isPending } = useCreateFolder(parentId)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      { folderName, parentId },
      {
        onSuccess: ({ id }) => {
          closeDialog()
          setFolderName('')
          if (id) navigate(`${PATHS.dashboard}/${id}`)
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
