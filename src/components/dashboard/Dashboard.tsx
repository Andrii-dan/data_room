import { Outlet } from 'react-router'

import { Header } from './Header'

export function Dashboard() {
  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex flex-col gap-4 p-6">
        <div className="h-16 bg-neutral-100 rounded shadow">TEST</div>
        <div className="h-[calc(100vh-190px)] bg-neutral-100 rounded shadow overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
