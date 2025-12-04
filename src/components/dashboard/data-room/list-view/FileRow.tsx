import { useState } from 'react'
import { useMedia } from 'react-use'

import { TextTruncate } from '@/components/ui/text-truncate'
import { useFilePreview } from '@/hooks'
import { cn, type FileItem } from '@/lib'

import { ItemActions } from '../ItemActions'
import { ItemHint } from '../ItemHint'

export function FileRow({ file }: { file: FileItem }) {
  const [isActionsMenuOpen, setisActionsMenuOpen] = useState(false)

  const { handlePreview, previewable, FileIcon, colorClass, fileUrl } = useFilePreview(file)

  const smallScreen = useMedia('(max-width: 639px)')

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between p-2',
        'hover:bg-accent rounded-lg hover:outline',
        isActionsMenuOpen && 'outline outline-primary bg-primary/5 hover:bg-primary/5',
      )}
      onDoubleClick={handlePreview}
    >
      <div className="flex items-center gap-2">
        <FileIcon className={cn('w-5 h-5', colorClass)} />
        <TextTruncate text={file.name} maxLength={smallScreen ? 40 : 100} />
      </div>
      <div className="flex items-center gap-2">
        <ItemHint item={file} viewMode="list" />
        <ItemActions
          item={file}
          fileUrl={fileUrl}
          previewable={previewable}
          isOpen={isActionsMenuOpen}
          setIsOpen={setisActionsMenuOpen}
          viewMode="list"
        />
      </div>
    </div>
  )
}
