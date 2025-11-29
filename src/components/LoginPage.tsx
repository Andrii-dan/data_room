import { supabase } from '@/lib'

export function LoginPage() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <button onClick={signIn}>Log In with Google</button>
    </div>
  )
}
