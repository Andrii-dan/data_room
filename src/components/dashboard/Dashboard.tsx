import { Outlet } from 'react-router'

import { ActionsPanel } from './ActionsPanel'
import { Header } from './Header'

export function Dashboard() {
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-pattern-dot">
      <Header />
      <div className="flex flex-col gap-4 p-8">
        <ActionsPanel />
        <div className="border-2 h-[calc(100vh-200px)] bg-neutral-100 dark:bg-slate-700/80 rounded-md overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
