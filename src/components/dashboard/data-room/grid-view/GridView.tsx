import { type Items } from '@/lib'

import { AnimatedItem } from '../AnimatedItem'
import { FileCard } from './FileCard'
import { FolderCard } from './FolderCard'

export function GridView({ folders, files }: Items) {
  return (
    <div className="flex flex-wrap gap-4 pb-6">
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
  )
}
