import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'

import { TextTruncate } from '@/components/ui/text-truncate'
import { cn, type FolderItem, PATHS } from '@/lib'

export function FolderCard({ folder }: { folder: FolderItem }) {
  const { id, name, createdAt } = folder

  const navigate = useNavigate()

  return (
    <div
      title={`Created: ${dayjs(createdAt).format('MMM D, YYYY hh:mm')}`}
      className={cn(
        'shrink-0 w-32 h-32 hover:border border-dotted rounded-lg cursor-pointer hover:bg-accent',
        'flex flex-col items-center justify-center gap-1',
      )}
      onClick={() => navigate(`${PATHS.dashboard}/${id}`)}
    >
      <FaFolder className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={name} maxLength={15} />
    </div>
  )
}
