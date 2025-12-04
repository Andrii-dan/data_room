import { useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { useMedia } from 'react-use'

import { TextTruncate } from '@/components/ui/text-truncate'
import { cn, type FolderItem, PATHS } from '@/lib'

import { ItemActions } from '../ItemActions'
import { ItemHint } from '../ItemHint'

export function FolderRow({ folder }: { folder: FolderItem }) {
  const [isActionsMenuOpen, setisActionsMenuOpen] = useState(false)

  const { id, name } = folder

  const navigate = useNavigate()

  const smallScreen = useMedia('(max-width: 639px)')

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between p-2',
        'hover:bg-accent rounded-lg hover:outline',
        isActionsMenuOpen && 'outline outline-primary bg-primary/5 hover:bg-primary/5',
      )}
      onDoubleClick={() => navigate(`${PATHS.dashboard}/${id}`)}
    >
      <div className="flex items-center gap-2">
        <FaFolder className="text-muted-foreground w-5 h-5" />
        <TextTruncate text={name} maxLength={smallScreen ? 40 : 100} />
      </div>
      <div className="flex items-center gap-2">
        <ItemHint item={folder} viewMode="list" />
        <ItemActions
          item={folder}
          isOpen={isActionsMenuOpen}
          setIsOpen={setisActionsMenuOpen}
          viewMode="list"
        />
      </div>
    </div>
  )
}
