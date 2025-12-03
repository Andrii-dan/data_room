import { FolderSearch, XCircle } from 'lucide-react'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

type Props = {
  search?: boolean
}

export function NoData({ search = false }: Props) {
  return (
    <Empty className="w-full h-full">
      <EmptyHeader>
        <EmptyMedia>
          {search ? (
            <XCircle className="text-muted-foreground" size={80} />
          ) : (
            <FolderSearch className="text-muted-foreground" size={80} />
          )}
        </EmptyMedia>
        <EmptyTitle>{search ? 'No Results Found' : 'Nothing Here Yet'}</EmptyTitle>
        <EmptyDescription>
          {search
            ? 'Your search did not match any folders or files.'
            : 'Use the buttons above to create a new folder or upload files.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
