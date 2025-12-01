import { useParams } from 'react-router'

import { useGetItems } from '@/hooks'

import { Spinner } from '../ui/spinner'

export function DataRoom() {
  const { folderId } = useParams()

  const { isLoading, data } = useGetItems(folderId)

  if (isLoading) return <Spinner fullScreen />

  const { folders = [], files = [] } = data || {}
  //TODO: Folders and Files ui
  return (
    <div className="flex flex-col p-4 gap-2">
      <div>
        <h2>Folders</h2>
        {folders.length === 0 ? (
          <div>No folders found</div>
        ) : (
          folders.map((folder) => <div key={folder.id}>{folder.name}</div>)
        )}
      </div>

      <div>
        <h2>Files</h2>
        {files.length === 0 ? (
          <div>No files found</div>
        ) : (
          files.map((file) => <div key={file.id}>{file.name}</div>)
        )}
      </div>
    </div>
  )
}
