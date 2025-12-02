import { FolderSearch } from 'lucide-react'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export function NoData() {
  return (
    <Empty className="w-full h-full">
      <EmptyHeader>
        <EmptyMedia>
          <FolderSearch className="text-muted-foreground" size={80} />
        </EmptyMedia>
        <EmptyTitle>Nothing Here Yet</EmptyTitle>
        <EmptyDescription>
          Use the buttons above to create a new folder or upload files.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
