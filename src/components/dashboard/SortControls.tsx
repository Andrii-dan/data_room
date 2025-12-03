import { useSearchParams } from 'react-router'
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  readFromLocalStorage,
  saveToLocalStorage,
  type SortBy,
  type SortOrder,
  URL_PARAMS,
} from '@/lib'

export function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = (searchParams.get(URL_PARAMS.sortBy) ||
    readFromLocalStorage<SortBy>(URL_PARAMS.sortBy) ||
    'name') as SortBy

  const sortOrder = (searchParams.get(URL_PARAMS.sortOrder) ||
    readFromLocalStorage<SortOrder>(URL_PARAMS.sortOrder) ||
    'asc') as SortOrder

  const updateSort = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    // Update URL
    const params = new URLSearchParams(searchParams)
    params.set(URL_PARAMS.sortBy, newSortBy)
    params.set(URL_PARAMS.sortOrder, newSortOrder)
    setSearchParams(params)

    // Persist in localStorage
    saveToLocalStorage(URL_PARAMS.sortBy, newSortBy)
    saveToLocalStorage(URL_PARAMS.sortOrder, newSortOrder)
  }

  const toggleOrder = () => updateSort(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')

  return (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={(option) => updateSort(option as SortBy, sortOrder)}>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
          <SelectItem value="updatedAt">Updated At</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleOrder}
        title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
      >
        {sortBy === 'name' ? (
          sortOrder === 'asc' ? (
            <ArrowDownAZ className="w-4 h-4" />
          ) : (
            <ArrowDownZA className="w-4 h-4" />
          )
        ) : sortOrder === 'asc' ? (
          <ArrowDown01 className="w-4 h-4" />
        ) : (
          <ArrowDown10 className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
