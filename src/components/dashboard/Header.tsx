import { useNavigate } from 'react-router'
import { Shapes, SunMoon } from 'lucide-react'

import { useTheme } from '@/context'
import { cn, PATHS } from '@/lib'

import { Button } from '../ui/button'
import { UserMenu } from './UserMenu'

export function Header() {
  const navigate = useNavigate()

  const { toggleTheme } = useTheme()

  return (
    <header
      className={cn(
        'h-14 w-full p-4 px-8 flex items-center justify-between',
        'bg-linear-to-tr from-sky-700 dark:from-sky-950 to-sky-600 dark:to-sky-900 text-white',
      )}
    >
      <div
        title="Navigate to root folder"
        className="flex items-center font-bungee group text-lg cursor-pointer"
        onClick={() => navigate(PATHS.dashboard)}
      >
        <span className="transition-transform duration-200 group-hover:translate-y-1">DATA</span>
        <Shapes className="mx-0.5 text-amber-500 transition-transform duration-200 group-hover:-translate-y-1" />
        <span className="transition-transform duration-200 group-hover:translate-y-1">ROOM</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon-sm" className="rounded-full" variant="secondary" onClick={toggleTheme}>
          <SunMoon />
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}
