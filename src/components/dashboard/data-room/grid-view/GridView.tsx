import { Link } from 'react-router'
import { ChevronLeft } from 'lucide-react'

import { type FolderItem, type Items, PATHS } from '@/lib'

import { AnimatedItem } from '../AnimatedItem'
import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'

interface Props extends Items {
  currentFolder?: FolderItem
}

export function GridView({ folders, files, currentFolder }: Props) {
  return (
    <>
      {currentFolder && (
        <Link
          className="flex items-center text-sm text-muted-foreground"
          to={
            currentFolder.parentId
              ? `${PATHS.dashboard}/${currentFolder.parentId}`
              : PATHS.dashboard
          }
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
      )}
      <div className="flex flex-wrap gap-4 pt-2 pb-6">
        {folders.map((folder) => (
          <AnimatedItem key={folder.id} id={folder.id}>
            <FolderCard key={folder.id} folder={folder} />
          </AnimatedItem>
        ))}
        {files.map((file) => (
          <AnimatedItem key={file.id} id={file.id}>
            <FileCard key={file.id} file={file} />
          </AnimatedItem>
        ))}
      </div>
    </>
  )
}
