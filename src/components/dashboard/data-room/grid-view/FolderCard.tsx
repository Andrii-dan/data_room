import { useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useTouchEvents } from '@/hooks'
import { cn, type FolderItem, PATHS } from '@/lib'

import { ItemActions } from '../ItemActions'
import { ItemHint } from '../ItemHint'

export function FolderCard({ folder }: { folder: FolderItem }) {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false)

  const { id, name } = folder

  const navigate = useNavigate()

  const handleOpenFolder = () => navigate(`${PATHS.dashboard}/${id}`)

  const { events } = useTouchEvents({
    onTap: handleOpenFolder,
    onLongPress: () => setIsActionsMenuOpen(true),
    onDoubleClick: handleOpenFolder,
  })

  return (
    <div
      className={cn(
        'shrink-0 w-32 h-32 rounded-lg',
        'flex flex-col items-center justify-center gap-1.5',
        'relative group hover:outline hover:outline-dotted hover:bg-accent active:bg-primary/10',
        isActionsMenuOpen && 'outline outline-primary bg-primary/5 hover:bg-primary/5',
      )}
      {...events}
    >
      <ItemHint item={folder} />
      <ItemActions item={folder} isOpen={isActionsMenuOpen} setIsOpen={setIsActionsMenuOpen} />
      <FaFolder className="text-muted-foreground w-16 h-16" />
      <TextTruncate className="text-xs" text={name} maxLength={15} />
    </div>
  )
}
