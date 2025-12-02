import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { TextTruncate } from '@/components/ui/text-truncate'
import { cn, type FolderItem, PATHS } from '@/lib'

import { ItemActions } from './ItemActions'

export function FolderCard({ folder }: { folder: FolderItem }) {
  const { id, name } = folder

  const navigate = useNavigate()

  return (
    <div
      title="Double click to open."
      className={cn(
        'shrink-0 w-28 md:w-32 h-28 md:h-32 hover:border border-dotted rounded-lg hover:bg-accent',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group',
      )}
      onDoubleClick={() => navigate(`${PATHS.dashboard}/${id}`)}
    >
      <ItemActions item={folder} />
      <FaFolder className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={name} maxLength={15} />
    </div>
  )
}
