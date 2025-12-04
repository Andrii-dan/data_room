import { useNavigate } from 'react-router'
import { FolderOpen } from 'lucide-react'

import { PATHS } from '@/lib'

export function Logo() {
  const navigate = useNavigate()

  return (
    <div
      title="Navigate to root folder"
      className="flex items-center font-bungee group text-lg cursor-pointer gap-1"
      onClick={() => navigate(PATHS.dashboard)}
    >
      <span className="transition-transform duration-200 group-hover:translate-y-1">DATA</span>
      <FolderOpen className="mx-0.5 text-amber-500 transition-transform duration-200 group-hover:-translate-y-1" />
      <span className="transition-transform duration-200 group-hover:translate-y-1">ROOM</span>
    </div>
  )
}
