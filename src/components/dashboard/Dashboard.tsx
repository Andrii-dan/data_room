import { Outlet } from 'react-router'

import { ActionsPanel } from './ActionsPanel'
import { Header } from './Header'

export function Dashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-pattern-dot">
      <Header />
      <div className="flex flex-col lg:gap-4 lg:p-8">
        <ActionsPanel />
        <div className="lg:border-2 h-[calc(100vh)] lg:h-[calc(100vh-200px)] bg-neutral-100 dark:bg-slate-700/80 lg:rounded-md overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
