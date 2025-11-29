import { Navigate, Route, Routes } from 'react-router'

import { Dashboard, Folder, LoginPage } from '@/components'
import { useAuth } from '@/context'

import { Spinner } from './components/ui/spinner'
import { PATHS } from './lib'

function App() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner fullScreen />

  return (
    <div className="bg-linear-to-tr from-slate-200 to-slate-300">
      <Routes>
        {/* Public Route */}
        <Route index element={!user ? <LoginPage /> : <Navigate to={PATHS.dashboard} replace />} />

        {/* Protected Route */}
        <Route
          path="dashboard"
          element={user ? <Dashboard /> : <Navigate to={PATHS.root} replace />}
        >
          <Route index element={<Folder />} />
          <Route path=":folderId" element={<Folder />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
