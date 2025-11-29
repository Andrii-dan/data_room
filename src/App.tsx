import { Navigate, Route, Routes } from 'react-router'

import { Dashboard, Folder, LoginPage } from '@/components'
import { useAuth } from '@/context'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-w-screen min-h-screen bg-neutral-200">
      <Routes>
        {/* Public Route */}
        <Route index element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Route */}
        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />}>
          <Route path=":folderId" element={<Folder />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
