import { useMemo } from 'react'
import { MdDelete } from 'react-icons/md'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { CloudDownload, Eye, MoreHorizontalIcon, MoreVerticalIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDialog } from '@/context'
import { cn, downloadFile, type FileItem, type FolderItem, previewFile, type ViewMode } from '@/lib'

import { ChangeItemName } from './ChangeItemName'
import { DeleteItem } from './DeleteItem'

type Props = {
  item: FileItem | FolderItem
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  fileUrl?: string | null
  previewable?: boolean
  viewMode?: ViewMode
}

export function ItemActions({
  item,
  isOpen,
  setIsOpen,
  fileUrl,
  previewable = false,
  viewMode = 'grid',
}: Props) {
  const { openDialog } = useDialog()

  const actions = useMemo(
    () => [
      {
        type: 'Preview',
        onClick: () => previewFile(fileUrl),
        icon: <Eye className="text-sky-500" />,
        isVisible: fileUrl && item.type === 'file' && previewable,
      },
      {
        type: 'Download',
        onClick: () => downloadFile(fileUrl ?? null, item.name),
        icon: <CloudDownload className="text-gold-drop-500" />,
        isVisible: fileUrl && item.type === 'file',
      },
      {
        type: 'Rename',
        onClick: () =>
          openDialog({
            title: `Rename ${item.type}`,
            content: <ChangeItemName item={item} />,
          }),
        icon: <MdDriveFileRenameOutline className="text-sky-500" />,
        isVisible: true,
      },
      {
        type: 'Delete',
        onClick: () =>
          openDialog({
            title: `Delete ${item.type}`,
            content: <DeleteItem item={item} />,
          }),
        icon: <MdDelete className="text-destructive" />,
        isVisible: true,
      },
    ],
    [item, fileUrl, previewable, openDialog],
  )

  const isGridView = viewMode === 'grid'

  return (
    <DropdownMenu
      modal={false}
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value)
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            isGridView && 'absolute top-1 right-2 transition opacity-0 group-hover:opacity-100',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {isGridView ? (
            <MoreHorizontalIcon className="w-5 h-5 text-muted-foreground" />
          ) : (
            <MoreVerticalIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isGridView ? 'start' : 'end'}>
        {actions.map(
          ({ type, icon, isVisible, onClick }) =>
            isVisible && (
              <DropdownMenuItem
                key={type}
                className="flex items-center cursor-pointer"
                onClick={onClick}
              >
                {icon}
                <span>{type}</span>
              </DropdownMenuItem>
            ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
