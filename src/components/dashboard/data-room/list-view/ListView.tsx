import { type Items } from '@/lib'

import { AnimatedItem } from '../AnimatedItem'
import { FileRow } from './FileRow'
import { FolderRow } from './FolderRow'

export function ListView({ folders, files }: Items) {
  return (
    <div className="flex flex-col gap-2 pb-6">
      {folders.map((folder) => (
        <AnimatedItem key={folder.id} id={folder.id}>
          <FolderRow key={folder.id} folder={folder} />
        </AnimatedItem>
      ))}
      {files.map((file) => (
        <AnimatedItem key={file.id} id={file.id}>
          <FileRow key={file.id} file={file} />
        </AnimatedItem>
      ))}
    </div>
  )
}
