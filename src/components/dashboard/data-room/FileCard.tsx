import { useState } from 'react'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useFilePreview } from '@/hooks'
import { cn, type FileItem } from '@/lib'

import { ItemActions } from './ItemActions'
import { ItemHint } from './ItemHint'

export function FileCard({ file }: { file: FileItem }) {
  const [isActionsMenuOpen, setisActionsMenuOpen] = useState(false)

  const { handlePreview, previewable, FileIcon, colorClass, fileUrl } = useFilePreview(file)

  return (
    <div
      className={cn(
        'shrink-0 w-28 md:w-32 h-28 md:h-32 rounded-lg',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group hover:border border-dotted hover:bg-accent',
        isActionsMenuOpen && 'border border-primary bg-primary/5 hover:bg-primary/5',
      )}
      onDoubleClick={handlePreview}
    >
      <ItemHint item={file} />
      <ItemActions
        item={file}
        fileUrl={fileUrl}
        previewable={previewable}
        isOpen={isActionsMenuOpen}
        setIsOpen={setisActionsMenuOpen}
      />
      <FileIcon className={cn('text-muted-foreground w-16 h-16', colorClass)} />
      <TextTruncate className="text-xs" text={file.name} maxLength={15} />
    </div>
  )
}
