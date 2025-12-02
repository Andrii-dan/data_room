import { useMemo } from 'react'
import { MdDelete } from 'react-icons/md'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { MoreHorizontalIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDialog } from '@/context'
import { type FileItem, type FolderItem } from '@/lib'

import { ChangeItemName } from './ChangeItemName'
import { DeleteItem } from './DeleteItem'

export function ItemActions({ item }: { item: FileItem | FolderItem }) {
  const { openDialog } = useDialog()

  const actions = useMemo(
    () => [
      {
        type: 'Rename',
        onClick: () =>
          openDialog({
            title: `Rename ${item.type}`,
            content: <ChangeItemName item={item} />,
          }),
        icon: <MdDriveFileRenameOutline className="text-sky-500" />,
      },
      {
        type: 'Delete',
        onClick: () =>
          openDialog({
            title: `Delete ${item.type}`,
            content: <DeleteItem item={item} />,
          }),
        icon: <MdDelete className="text-destructive" />,
      },
    ],
    [item, openDialog],
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="absolute top-1 right-2 transition opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontalIcon className="w-5 h-5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map(({ type, icon, onClick }) => (
          <DropdownMenuItem
            key={type}
            className="flex items-center cursor-pointer"
            onClick={onClick}
          >
            {icon}
            <span>{type}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
