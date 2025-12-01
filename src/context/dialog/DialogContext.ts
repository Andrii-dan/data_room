import { createContext } from 'react'

import type { DialogContextType } from '@/lib'

export const DialogContext = createContext<DialogContextType | undefined>(undefined)
