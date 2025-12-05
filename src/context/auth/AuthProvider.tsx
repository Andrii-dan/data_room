import { type ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import type { AuthContextType } from '@/lib'
import { supabase } from '@/lib/supabaseClient'

import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthContextType['session'] | null>(null)
  const [loading, setLoading] = useState(true)

  const logOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
    } catch (err) {
      toast.error('Something went wrong while logging out. Please try again.')
      console.error('Logout failed:', err)
    } finally {
      setLoading(false)
    }
  }

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
        loading,
        logOut,
      }}
    >
      {children}
    </AuthContext>
  )
}
