import { Link } from 'react-router'
import { ChevronLeft, Ellipsis } from 'lucide-react'

import { cn, type FolderItem, PATHS, type ViewMode } from '@/lib'

type Props = {
  currentFolder?: FolderItem
  variant?: ViewMode
}

export function NavigateBack({ currentFolder, variant = 'grid' }: Props) {
  if (!currentFolder) return null

  const to = currentFolder.parentId
    ? `${PATHS.dashboard}/${currentFolder.parentId}`
    : PATHS.dashboard

  const isGrid = variant === 'grid'

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center text-muted-foreground',
        isGrid
          ? 'text-sm'
          : 'h-10 min-h-10 px-2 hover:bg-accent rounded-md hover:outline hoveroutline-dotted',
      )}
    >
      {isGrid ? (
        <>
          <ChevronLeft className="w-4 h-4" />
          Back
        </>
      ) : (
        <Ellipsis className="w-4 h-4" />
      )}
    </Link>
  )
}
