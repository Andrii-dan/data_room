import { useParams } from 'react-router'

export function Folder() {
  const { folderId } = useParams()

  const isRootFolder = !folderId

  return <div>{isRootFolder ? 'Root Folder' : folderId}</div>
}
