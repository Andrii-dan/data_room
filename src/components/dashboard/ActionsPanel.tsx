import { useParams } from 'react-router'
import { Plus, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { cn, formatFileSize, MAX_FILE_SIZE } from '@/lib'

import { Breadcrumbs } from './Breadcrumbs'
import { CreateFolder } from './CreateFolder'
import { SearchInput } from './SearchInput'
import { UploadFile } from './upload'

export function ActionsPanel() {
  const { folderId } = useParams()

  const { openDialog } = useDialog()

  const openCreateFolderDialog = () =>
    openDialog({
      title: 'Create Folder',
      description: 'Enter a name for the new folder you want to create.',
      content: <CreateFolder parentId={folderId} />,
    })

  const openUploadFileDialog = () =>
    openDialog({
      title: 'Upload File',
      description: `Choose one or more files. Each file cannot be larger than ${formatFileSize(MAX_FILE_SIZE)}.`, // TODO: Add Description with rules
      content: <UploadFile parentId={folderId} />,
    })

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-1 h-16 p-4',
        'border-2 bg-neutral-100 dark:bg-slate-700/80 rounded-md',
      )}
    >
      <Breadcrumbs />

      <div className="flex items-center gap-3">
        <SearchInput />
        <Button size="sm" variant="outline" onClick={openCreateFolderDialog} title="New Folder">
          <span className="hidden sm:inline">New Folder</span>
          <Plus />
        </Button>
        <Button size="sm" onClick={openUploadFileDialog} title="Upload">
          <span className="hidden sm:inline">Upload</span>
          <Upload />
        </Button>
      </div>
    </div>
  )
}
