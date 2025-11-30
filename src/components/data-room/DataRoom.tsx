import { useParams } from 'react-router'
import { Home, Plus, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DataRoom() {
  const { folderId } = useParams()

  const isRootFolder = !folderId

  return (
    <div className="flex flex-col p-4 gap-2">
      {/* TODO: use actual breadcrumbs */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          {isRootFolder ? (
            <>
              <Home className="size-4" />
              Breadcrumbs
            </>
          ) : (
            folderId
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline">
            New Folder <Plus />
          </Button>
          <Button size="sm">
            Upload <Upload />
          </Button>
        </div>
      </div>
      <div>FOLDERS</div>
      <div>FILES</div>
    </div>
  )
}
