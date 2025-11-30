import { supabase } from '@/lib'

import { Button } from './ui/button'

export function LoginPage() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-pattern-dot">
      <div className="w-1/3 h-1/5 flex items-center justify-center bg-background rounded-md">
        <Button onClick={signIn}>Log In with Google</Button>
      </div>
    </div>
  )
}
