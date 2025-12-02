import { FaFile } from 'react-icons/fa'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useFilePreview } from '@/hooks'
import { cn, type FileItem } from '@/lib'

import { ItemActions } from './ItemActions'

export function FileCard({ file }: { file: FileItem }) {
  const { handlePreview, previewable } = useFilePreview(file)

  return (
    <div
      title={
        previewable
          ? 'Double click to preview this file in a new tab'
          : 'Double click to download this file'
      }
      className={cn(
        'shrink-0 w-32 h-32 hover:border border-dotted rounded-lg cursor-pointer hover:bg-accent',
        'flex flex-col items-center justify-center gap-1',
        'relative group',
      )}
      onDoubleClick={handlePreview}
    >
      <ItemActions item={file} />
      <FaFile className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={file.name} maxLength={15} />
    </div>
  )
}
