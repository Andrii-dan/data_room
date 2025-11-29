import { useParams } from 'react-router'

export function Folder() {
  const { folderId } = useParams()

  return <div>{folderId}</div>
}
