import { useEffect, useEffectEvent, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'react-use'
import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { URL_PARAMS } from '@/lib'

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get(URL_PARAMS.search) || '')

  useDebounce(
    () => {
      const params = new URLSearchParams(searchParams)

      if (inputValue.trim()) {
        params.set(URL_PARAMS.search, inputValue)
      } else {
        params.delete(URL_PARAMS.search)
      }

      setSearchParams(params)
    },
    400,
    [inputValue],
  )

  const handleUrlChange = useEffectEvent(() => {
    const next = searchParams.get(URL_PARAMS.search) || ''
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
        name="search"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-26 md:w-48 h-8 pr-6 md:pr-12"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
        {inputValue && (
          <Button
            variant="ghost"
            onClick={() => setInputValue('')}
            className="hidden md:flex w-4 h-4  items-center justify-center"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Search className="w-4 h-4" />
      </div>
    </div>
  )
}
