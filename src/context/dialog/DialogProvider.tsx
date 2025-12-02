import { useCallback, useState } from 'react'

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

  const openDialog = useCallback((options: DialogOptions) => {
    setDialogOptions(options)
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    // Optional callback
    dialogOptions?.onClose?.()

    setIsOpen(false)
    setDialogOptions(null)
  }, [dialogOptions])

  return (
    <DialogContext value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
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
