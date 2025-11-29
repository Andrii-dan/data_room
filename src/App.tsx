import { Navigate, Route, Routes } from 'react-router'

import { Dashboard } from '@/components'
import { useAuth } from '@/context'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-w-screen min-h-screen bg-neutral-200">
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={<div className="flex items-center justify-center">Data Room App</div>}
        />

        {/* Protected Route */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
