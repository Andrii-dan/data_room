import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { useMedia } from 'react-use'

import { Spinner } from '@/components/ui/spinner'
import { useGetItems } from '@/hooks'
import {
  filterAndSortItems,
  readFromLocalStorage,
  setDocumentTitle,
  type SortBy,
  type SortOrder,
  URL_PARAMS,
  type ViewMode,
} from '@/lib'

import { GridView } from './grid-view'
import { ListView } from './list-view'
import { NoData } from './NoData'

export function DataRoom() {
  const { folderId } = useParams()
  const { isLoading, data } = useGetItems(folderId)
  const { folders = [], files = [], currentFolder } = data || {}

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get(URL_PARAMS.search) || ''

  const smallScreen = useMedia('(max-width: 639px)')

  // View mode
  const viewMode: ViewMode = smallScreen
    ? 'list'
    : ((searchParams.get(URL_PARAMS.view) ||
        readFromLocalStorage<ViewMode>(URL_PARAMS.view) ||
        'grid') as ViewMode)

  // Sort By
  const sortBy = (searchParams.get(URL_PARAMS.sortBy) ||
    readFromLocalStorage<SortBy>(URL_PARAMS.sortBy) ||
    'name') as SortBy

  // Sort order
  const sortOrder = (searchParams.get(URL_PARAMS.sortOrder) ||
    readFromLocalStorage<SortOrder>(URL_PARAMS.sortOrder) ||
    'asc') as SortOrder

  useEffect(() => {
    setDocumentTitle(currentFolder?.name)
  }, [currentFolder])

  if (isLoading) return <Spinner fullScreen />

  // Items to render
  const filteredFolders = filterAndSortItems(folders, searchQuery, sortBy, sortOrder)
  const filteredFiles = filterAndSortItems(files, searchQuery, sortBy, sortOrder)

  const isEmpty = !filteredFolders.length && !filteredFiles.length

  return (
    <div className="h-full px-4">
      {isEmpty ? (
        <NoData search={!!searchQuery} />
      ) : viewMode === 'grid' ? (
        <GridView folders={filteredFolders} files={filteredFiles} currentFolder={currentFolder} />
      ) : (
        <ListView folders={filteredFolders} files={filteredFiles} currentFolder={currentFolder} />
      )}
    </div>
  )
}
