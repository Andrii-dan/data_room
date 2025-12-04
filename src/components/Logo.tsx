import { useNavigate } from 'react-router'
import { FolderOpen } from 'lucide-react'

import { cn, PATHS } from '@/lib'

export function Logo({ disableNavigation }: { disableNavigation?: boolean }) {
  const navigate = useNavigate()

  return (
    <div
      title="Navigate to root folder"
      className={cn(
        'flex items-center font-bungee group text-lg gap-1',
        !disableNavigation && 'cursor-pointer',
      )}
      onClick={() => !disableNavigation && navigate(PATHS.dashboard)}
    >
      <span className="transition-transform duration-200 group-hover:translate-y-1">DATA</span>
      <FolderOpen className="mx-0.5 text-amber-500 transition-transform duration-200 group-hover:-translate-y-1" />
      <span className="transition-transform duration-200 group-hover:translate-y-1">ROOM</span>
    </div>
  )
}
