import { type ReactNode, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabaseClient'
import type { AuthContextType } from '@/types'

import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthContextType['session'] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load session on app start
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // Listen for sign-in/sign-out changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext
      value={{
        session,
        user: session?.user ?? null,
      }}
    >
      {!loading && children}
    </AuthContext>
  )
}
