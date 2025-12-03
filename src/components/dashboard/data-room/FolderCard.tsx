import { useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { TextTruncate } from '@/components/ui/text-truncate'
import { cn, type FolderItem, PATHS } from '@/lib'

import { ItemActions } from './ItemActions'
import { ItemHint } from './ItemHint'

export function FolderCard({ folder }: { folder: FolderItem }) {
  const [isActionsMenuOpen, setisActionsMenuOpen] = useState(false)

  const { id, name } = folder

  const navigate = useNavigate()

  return (
    <div
      className={cn(
        'shrink-0 w-28 md:w-32 h-28 md:h-32 rounded-lg',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group hover:border border-dotted hover:bg-accent',
        isActionsMenuOpen && 'border border-primary bg-primary/5 hover:bg-primary/5',
      )}
      onDoubleClick={() => navigate(`${PATHS.dashboard}/${id}`)}
    >
      <ItemHint item={folder} />
      <ItemActions item={folder} isOpen={isActionsMenuOpen} setIsOpen={setisActionsMenuOpen} />
      <FaFolder className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={name} maxLength={15} />
    </div>
  )
}
