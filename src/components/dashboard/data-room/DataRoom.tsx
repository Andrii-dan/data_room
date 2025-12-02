import { useParams } from 'react-router'

import { Spinner } from '@/components/ui/spinner'
import { useGetItems } from '@/hooks'

import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'
import { NoData } from './NoData'

export function DataRoom() {
  const { folderId } = useParams()

  const { isLoading, data } = useGetItems(folderId)

  if (isLoading) return <Spinner fullScreen />

  const { folders = [], files = [] } = data || {}

  if (!folders.length && !files.length) return <NoData />

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {folders.length > 0 &&
        folders.map((folder) => <FolderCard key={folder.id} folder={folder} />)}
      {files.length > 0 && files.map((file) => <FileCard key={file.id} file={file} />)}
    </div>
  )
}
