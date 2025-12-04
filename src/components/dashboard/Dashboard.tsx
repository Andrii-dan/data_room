import { Outlet } from 'react-router'

import { cn } from '@/lib'

import { Breadcrumbs } from './Breadcrumbs'
import { Header } from './dashboard-header'
import { ActionsPanel } from './data-room'

export function Dashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-pattern-dot">
      <Header />
      <div
        className={cn(
          'flex flex-col gap-3 lg:gap-4 lg:m-8 bg-neutral-100 dark:bg-slate-700/80',
          'lg:border-2 lg:rounded-md',
        )}
      >
        <Breadcrumbs />
        <ActionsPanel />
        <div className="h-[calc(100vh-148px)] lg:h-[calc(100vh-220px)] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
