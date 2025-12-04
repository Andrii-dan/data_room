import { useState } from 'react'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useFilePreview, useTouchEvents } from '@/hooks'
import { cn, type FileItem } from '@/lib'

import { ItemActions } from '../ItemActions'
import { ItemHint } from '../ItemHint'

export function FileCard({ file }: { file: FileItem }) {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false)

  const { handlePreview, previewable, FileIcon, colorClass, fileUrl } = useFilePreview(file)

  const { events } = useTouchEvents({
    onLongPress: () => setIsActionsMenuOpen(true),
    onDoubleClick: handlePreview,
  })

  return (
    <div
      className={cn(
        'shrink-0 w-32 h-32 rounded-lg',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group hover:outline hover:outline-dotted active:bg-primary/10 hover:bg-accent',
        isActionsMenuOpen && 'outline outline-primary bg-primary/5 hover:bg-primary/5',
      )}
      {...events}
    >
      <ItemHint item={file} />
      <ItemActions
        item={file}
        fileUrl={fileUrl}
        previewable={previewable}
        isOpen={isActionsMenuOpen}
        setIsOpen={setIsActionsMenuOpen}
      />
      <FileIcon className={cn('text-muted-foreground w-16 h-16', colorClass)} />
      <TextTruncate className="text-xs" text={file.name} maxLength={15} />
    </div>
  )
}
