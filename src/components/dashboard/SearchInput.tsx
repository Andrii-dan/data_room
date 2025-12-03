import { useEffect, useEffectEvent, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'react-use'
import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '../ui/button'

const SEARCH_PARAM = 'q'

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get(SEARCH_PARAM) || '')

  useDebounce(
    () => {
      const params = new URLSearchParams(searchParams)

      if (inputValue.trim()) {
        params.set(SEARCH_PARAM, inputValue)
      } else {
        params.delete(SEARCH_PARAM)
      }

      setSearchParams(params)
    },
    400,
    [inputValue],
  )

  const handleUrlChange = useEffectEvent(() => {
    const next = searchParams.get(SEARCH_PARAM) || ''
    if (next !== inputValue) {
      setInputValue(next)
    }
  })

  useEffect(() => {
    handleUrlChange()
  }, [searchParams])

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-8 pr-12"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
        {inputValue && (
          <Button
            variant="ghost"
            onClick={() => setInputValue('')}
            className="w-4 h-4 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Search className="w-4 h-4" />
      </div>
    </div>
  )
}
