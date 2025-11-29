import { useNavigate } from 'react-router'
import { Shapes } from 'lucide-react'

import { cn, PATHS } from '@/lib'

import { UserMenu } from './UserMenu'

export function Header() {
  const navigate = useNavigate()

  return (
    <header
      className={cn(
        'h-14 w-full p-4 px-6 flex items-center justify-between',
        'bg-linear-to-tr from-sky-700 to-sky-600 text-white',
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
      <UserMenu />
    </header>
  )
}
