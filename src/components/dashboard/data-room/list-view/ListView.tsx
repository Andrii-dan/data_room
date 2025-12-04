import { Link } from 'react-router'
import { Ellipsis } from 'lucide-react'

import { type FolderItem, type Items, PATHS } from '@/lib'

import { FileRow } from './FileRow'
import { FolderRow } from './FolderRow'

interface Props extends Items {
  currentFolder?: FolderItem
}

export function ListView({ folders, files, currentFolder }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {currentFolder && (
        <Link
          className="flex items-center h-10 p-1 px-2 hover:bg-accent rounded-md hover:outline hoveroutline-dotted"
          to={
            currentFolder.parentId
              ? `${PATHS.dashboard}/${currentFolder.parentId}`
              : PATHS.dashboard
          }
        >
          <Ellipsis className="text-muted-foreground w-4 h-4" />
        </Link>
      )}

      {folders.map((folder) => (
        <FolderRow key={folder.id} folder={folder} />
      ))}
      {files.map((file) => (
        <FileRow key={file.id} file={file} />
      ))}
    </div>
  )
}
