import { useState } from 'react'
import { Info } from 'lucide-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { TextTruncate } from '@/components/ui/text-truncate'
import { useTouchEvents } from '@/hooks'
import {
  cn,
  type FileItem,
  type FolderItem,
  formatDate,
  formatFileSize,
  type ViewMode,
} from '@/lib'

type Props = {
  item: FolderItem | FileItem
  previewable?: boolean
  viewMode?: ViewMode
}

export function ItemHint({ item, previewable, viewMode = 'grid' }: Props) {
  const [open, setOpen] = useState(false)

  const isFile = item.type === 'file'
  const isGridView = viewMode === 'grid'

  const { isTouchDevice } = useTouchEvents({})

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Info
          className={cn(
            'w-4 h-4 text-muted-foreground',
            isGridView && !isTouchDevice && 'opacity-0',
            isGridView && 'absolute top-2 left-2 transition group-hover:opacity-100',
          )}
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        />
      </HoverCardTrigger>

      <HoverCardContent
        className="text-xs text-muted-foreground space-y-1 max-w-xs"
        align="end"
        sideOffset={16}
      >
        <div className="font-medium mb-2">{item.name}</div>

        {isFile && (
          <>
            <div className="flex justify-between">
              <span>Type: </span>
              <TextTruncate className="text-muted-foreground" text={item.fileType} maxLength={20} />
            </div>
            <div className="flex justify-between">
              <span>Size: </span>
              <span className="text-muted-foreground">{formatFileSize(item.file.size)}</span>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <span>Created: </span>
          <span className="text-muted-foreground">{formatDate(item.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span>Updated: </span>
          <span className="text-muted-foreground">{formatDate(item.updatedAt)}</span>
        </div>

        {!isTouchDevice && (
          <p className="mt-4 text-xs">
            {isFile
              ? previewable
                ? 'Double click to preview this file in a new tab'
                : 'Double click to download this file'
              : 'Double click to open.'}
          </p>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
