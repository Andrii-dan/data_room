import { createContext } from 'react'

import type { AuthContextType } from '@/lib'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
