import { Link, useParams } from 'react-router'
import { ChevronLeft } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'
import { useGetItems } from '@/hooks'
import { PATHS } from '@/lib'

import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'
import { NoData } from './NoData'

export function DataRoom() {
  const { folderId } = useParams()

  const { isLoading, data } = useGetItems(folderId)

  if (isLoading) return <Spinner fullScreen />

  const { folders = [], files = [], currentFolder } = data || {}

  return (
    <div className="h-full p-4">
      {currentFolder && (
        <Link
          className="mb-1.5 flex items-center text-muted-foreground text-sm gap-1"
          to={
            currentFolder.parentId
              ? `${PATHS.dashboard}/${currentFolder.parentId}`
              : PATHS.dashboard
          }
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>
      )}
      {!folders.length && !files.length ? (
        <NoData />
      ) : (
        <div className="flex flex-wrap gap-4">
          {folders.length > 0 &&
            folders.map((folder) => <FolderCard key={folder.id} folder={folder} />)}
          {files.length > 0 && files.map((file) => <FileCard key={file.id} file={file} />)}
        </div>
      )}
    </div>
  )
}
