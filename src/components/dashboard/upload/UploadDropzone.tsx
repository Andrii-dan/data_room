import { CloudUpload } from 'lucide-react'

import { cn } from '@/lib'

type Props = {
  isDragOver: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  onSelectFiles: (files: FileList | null) => void
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>
}

export function UploadDropzone({ isDragOver, inputRef, onSelectFiles, setIsDragOver }: Props) {
  return (
    <div
      className={cn(
        'h-48 flex flex-col items-center justify-center cursor-pointer text-muted-foreground',
        'border-2 border-dashed rounded-lg hover:border-primary transition-colors',
        isDragOver ? 'bg-primary/20' : 'bg-background',
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        onSelectFiles(e.dataTransfer.files)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
    >
      <CloudUpload className="w-12 h-12 mb-2" />
      <p>Drag & drop files here or click to select</p>

      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => onSelectFiles(e.target.files)}
      />
    </div>
  )
}
