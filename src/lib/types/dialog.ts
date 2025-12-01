export interface DialogOptions {
  title: React.ReactNode | string
  description?: React.ReactNode | string
  content: React.ReactNode
  onClose?: VoidFunction
}

export interface DialogContextType {
  openDialog: (options: DialogOptions) => void
  closeDialog: VoidFunction
}
