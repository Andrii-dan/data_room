import { useParams } from 'react-router'
import { Plus, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { formatFileSize, MAX_FILE_SIZE } from '@/lib'

import { CreateFolder } from './CreateFolder'
import { SearchInput } from './SearchInput'
import { SortControls } from './SortControls'
import { UploadFile } from './upload'
import { ViewSwitcher } from './ViewSwitcher'

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
      description: `Choose one or more files. Each file cannot be larger than ${formatFileSize(MAX_FILE_SIZE)}.`,
      content: <UploadFile parentId={folderId} />,
    })

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-3 px-1.5 md:px-2 lg:px-4">
      <div className="flex items-center gap-2 lg:gap-3">
        <ViewSwitcher />
        <SortControls />
        <SearchInput />
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
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
