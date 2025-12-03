import { Info } from 'lucide-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { TextTruncate } from '@/components/ui/text-truncate'
import { type FileItem, type FolderItem, formatDate, formatFileSize } from '@/lib'

type Props = {
  item: FolderItem | FileItem
  previewable?: boolean
}

export function ItemHint({ item, previewable }: Props) {
  const isFile = item.type === 'file'

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Info className="w-4 h-4 absolute top-2 left-2 transition opacity-0 group-hover:opacity-100 text-muted-foreground" />
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

        <p className="mt-4 text-xs">
          {isFile
            ? previewable
              ? 'Double click to preview this file in a new tab'
              : 'Double click to download this file'
            : 'Double click to open.'}
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
