import { useSearchParams } from 'react-router'
import { LayoutGrid, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { readFromLocalStorage, saveToLocalStorage, URL_PARAMS, type ViewMode } from '@/lib'

export function ViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentView = (searchParams.get(URL_PARAMS.view) ||
    readFromLocalStorage(URL_PARAMS.view) ||
    'grid') as ViewMode

  const setView = (viewMode: ViewMode) => {
    searchParams.set(URL_PARAMS.view, viewMode)
    setSearchParams(searchParams)
    saveToLocalStorage(URL_PARAMS.view, viewMode)
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      <Button
        variant={currentView === 'grid' ? 'default' : 'outline'}
        size="icon-sm"
        onClick={() => setView('grid')}
        title="Switch to grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </Button>

      <Button
        variant={currentView === 'list' ? 'default' : 'outline'}
        size="icon-sm"
        onClick={() => setView('list')}
        title="Switch to list view"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
}
