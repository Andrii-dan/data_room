import { cn } from '@/lib'

import { Logo } from '../../Logo'
import { ThemeSwitcher } from './ThemeSwitcher'
import { UserMenu } from './UserMenu'

export function Header() {
  return (
    <header
      className={cn(
        'h-14 w-full p-4 lg:px-8 flex items-center justify-between',
        'bg-linear-to-tr from-sky-700 dark:from-sky-950 to-sky-600 dark:to-sky-900 text-white',
      )}
    >
      <Logo />
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </header>
  )
}
