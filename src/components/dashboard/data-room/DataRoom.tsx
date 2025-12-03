import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { ChevronLeft } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'
import { useGetItems } from '@/hooks'
import { filterAndSortItems, PATHS, setDocumentTitle } from '@/lib'

import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'
import { NoData } from './NoData'

export function DataRoom() {
  const { folderId } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')?.toLowerCase() || ''

  const { isLoading, data } = useGetItems(folderId)

  const { folders = [], files = [], currentFolder } = data || {}

  const filteredFolders = filterAndSortItems(folders, searchQuery, 'name', 'asc')
  const filteredFiles = filterAndSortItems(files, searchQuery, 'name', 'asc')

  useEffect(() => {
    setDocumentTitle(currentFolder?.name)
  }, [currentFolder])

  if (isLoading) return <Spinner fullScreen />

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
      {!filteredFolders.length && !filteredFiles.length ? (
        <NoData search={!!searchQuery} />
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredFolders.length > 0 &&
            filteredFolders.map((folder) => <FolderCard key={folder.id} folder={folder} />)}
          {filteredFiles.length > 0 &&
            filteredFiles.map((file) => <FileCard key={file.id} file={file} />)}
        </div>
      )}
    </div>
  )
}
