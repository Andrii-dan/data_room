import { FaFile } from 'react-icons/fa'
import dayjs from 'dayjs'

import { TextTruncate } from '@/components/ui/text-truncate'
import { cn, type FileItem } from '@/lib'

export function FileCard({ file }: { file: FileItem }) {
  const { name, createdAt } = file

  return (
    <div
      title={`Created: ${dayjs(createdAt).format('MMM D, YYYY hh:mm')}`}
      className={cn(
        'shrink-0 w-32 h-32 hover:border border-dotted rounded-lg cursor-pointer hover:bg-accent',
        'flex flex-col items-center justify-center gap-1',
      )}
    >
      <FaFile className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={name} maxLength={15} />
    </div>
  )
}
