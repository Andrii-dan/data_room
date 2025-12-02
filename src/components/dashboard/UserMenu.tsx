import { LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context'

import { UserAvatar } from './UserAvatar'

export function UserMenu() {
  const { user, logOut } = useAuth()

  const name = user?.user_metadata?.name ?? ''
  const src = user?.user_metadata?.avatar_url ?? ''
  const email = user?.email ?? ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer  p-1 rounded-full hover:bg-white/5">
          <UserAvatar src={src} alt={name} />
          <span className="hidden lg:block text-sm text-white/90">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:w-80" align="end">
        <DropdownMenuLabel className="w-full flex flex-col items-center justify-center">
          <span className="text-base">{name}</span>
          <span className="text-sm text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-center cursor-pointer" onClick={logOut}>
          Log out
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
