import { useParams } from 'react-router'
import { Home, Plus, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { cn, formatFileSize, MAX_FILE_SIZE } from '@/lib'

import { CreateFolder } from './CreateFolder'
import { UploadFile } from './upload'

export function ActionsPanel() {
  const { folderId } = useParams()

  const { openDialog } = useDialog()

  const openCreateFolderDialog = () =>
    openDialog({
      title: 'Create Folder',
      description: 'Enter a name for the new folder you want to create.',
      content: <CreateFolder />,
    })

  const openUploadFileDialog = () =>
    openDialog({
      title: 'Upload File',
      description: `Choose one or more files. Each file cannot be larger than ${formatFileSize(MAX_FILE_SIZE)}.`, // TODO: Add Description with rules
      content: <UploadFile />,
    })

  const isRootFolder = !folderId

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-1 h-16 p-4',
        'border-2 bg-slate-100/70 dark:bg-slate-700/80 rounded-md',
      )}
    >
      {/* TODO: use actual breadcrumbs */}
      <div className="flex items-center gap-1">
        {isRootFolder ? (
          <>
            <Home className="size-4" />
            Breadcrumbs
          </>
        ) : (
          folderId
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={openCreateFolderDialog}>
          New Folder <Plus />
        </Button>
        <Button size="sm" onClick={openUploadFileDialog}>
          Upload <Upload />
        </Button>
      </div>
    </div>
  )
}
