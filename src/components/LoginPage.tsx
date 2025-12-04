import { FcGoogle } from 'react-icons/fc'

import { cn, supabase } from '@/lib'

import { Logo } from './Logo'
import { Button } from './ui/button'

export function LoginPage() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-pattern-dot">
      <div
        className={cn(
          'w-full h-full md:max-w-md md:w-full md:h-auto text-center p-6 md:p-8',
          'flex flex-col items-center justify-center gap-6',
          'bg-background/60 md:bg-background/90 rounded-none shadow-none md:rounded-lg md:shadow-lg',
        )}
      >
        <Logo disableNavigation />
        <p className="text-sm sm:text-base text-muted-foreground">
          Log in with your Google account to securely upload, manage, and preview your files.
        </p>
        <Button onClick={signIn} variant="outline" className="flex items-center gap-2">
          <FcGoogle className="w-5 h-5" />
          Log in with Google
        </Button>
        <p className="text-xs text-muted-foreground">
          We only use Google login for authentication. Your files remain private and secure.
        </p>
      </div>
    </div>
  )
}
