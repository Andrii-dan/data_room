import { SunMoon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/context'

export function ThemeSwitcher() {
  const { toggleTheme } = useTheme()

  return (
    <Button size="icon-sm" className="rounded-full" variant="secondary" onClick={toggleTheme}>
      <SunMoon />
    </Button>
  )
}
