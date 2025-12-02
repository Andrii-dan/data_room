import { TextTruncate } from '@/components/ui/text-truncate'
import { useFilePreview } from '@/hooks'
import { cn, type FileItem } from '@/lib'

import { ItemActions } from './ItemActions'

export function FileCard({ file }: { file: FileItem }) {
  const { handlePreview, previewable, FileIcon, colorClass, fileUrl } = useFilePreview(file)

  return (
    <div
      title={
        previewable
          ? 'Double click to preview this file in a new tab'
          : 'Double click to download this file'
      }
      className={cn(
        'shrink-0 w-28 md:w-32 h-28 md:h-32 hover:border border-dotted rounded-lg cursor-pointer hover:bg-accent',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group',
      )}
      onDoubleClick={handlePreview}
    >
      <ItemActions item={file} fileUrl={fileUrl} previewable={previewable} />
      <FileIcon className={cn('text-muted-foreground w-16 h-16', colorClass)} />
      <TextTruncate className="text-xs" text={file.name} maxLength={15} />
    </div>
  )
}
