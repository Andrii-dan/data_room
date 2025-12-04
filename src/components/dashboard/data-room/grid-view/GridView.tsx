import type { Items } from '@/lib'

import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'

export function GridView({ folders, files }: Items) {
  return (
    <div className="flex flex-wrap gap-4">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  )
}
