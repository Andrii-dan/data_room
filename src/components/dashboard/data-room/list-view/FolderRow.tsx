import { useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { useMedia } from 'react-use'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useTouchEvents } from '@/hooks'
import { cn, type FolderItem, PATHS } from '@/lib'

import { ItemActions } from '../ItemActions'
import { ItemHint } from '../ItemHint'

export function FolderRow({ folder }: { folder: FolderItem }) {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false)

  const { id, name } = folder

  const navigate = useNavigate()

  const smallScreen = useMedia('(max-width: 639px)')

  const handleOpenFolder = () => navigate(`${PATHS.dashboard}/${id}`)

  const { events } = useTouchEvents({
    onTap: handleOpenFolder,
    onLongPress: () => setIsActionsMenuOpen(true),
    onDoubleClick: handleOpenFolder,
  })

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between p-2',
        'hover:bg-accent hover:outline active:bg-primary/10 rounded-lg',
        isActionsMenuOpen && 'outline outline-primary bg-primary/5 hover:bg-primary/5',
      )}
    >
      <div className="flex flex-1 items-center gap-2" {...events}>
        <FaFolder className="text-muted-foreground w-5 h-5" />
        <TextTruncate text={name} maxLength={smallScreen ? 20 : 100} />
      </div>
      <div className="flex items-center gap-2">
        <ItemHint item={folder} viewMode="list" />
        <ItemActions
          item={folder}
          isOpen={isActionsMenuOpen}
          setIsOpen={setIsActionsMenuOpen}
          viewMode="list"
        />
      </div>
    </div>
  )
}
