import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DialogOptions } from '@/lib'

import { DialogContext } from './DialogContext'

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = (options: DialogOptions) => {
    setDialogOptions(options)
    setIsOpen(true)
  }

  const closeDialog = () => {
    // Optional callback
    dialogOptions?.onClose?.()

    setIsOpen(false)
    setDialogOptions(null)
  }

  return (
    <DialogContext value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogOptions?.title}</DialogTitle>
            <DialogDescription>{dialogOptions?.description}</DialogDescription>
          </DialogHeader>
          {dialogOptions?.content}
        </DialogContent>
      </Dialog>
    </DialogContext>
  )
}
