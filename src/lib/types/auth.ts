import { type Session, type User } from '@supabase/supabase-js'

export interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  logOut: () => Promise<void>
}
