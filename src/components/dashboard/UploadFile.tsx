import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { CloudUpload, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { useUploadFile } from '@/hooks'
import { cn, formatFileSize } from '@/lib'

export function UploadFile() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const { closeDialog } = useDialog()
  const { folderId: parentId } = useParams()
  const { uploadFiles, isUploading } = useUploadFile(parentId)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFiles(Array.from(e.target.files))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.files) return
    setFiles(Array.from(e.dataTransfer.files))
    setIsDragOver(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    uploadFiles(files, closeDialog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          'h-48 flex flex-col items-center justify-center cursor-pointer text-muted-foreground',
          'border-2 border-dashed rounded-lg hover:border-primary transition-colors',
          isDragOver ? 'bg-primary/20' : 'bg-background',
        )}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <CloudUpload className="w-12 h-12 mb-2" />
        <p>Drag & drop files here or click to select</p>
        <input type="file" multiple ref={inputRef} onChange={handleFileChange} hidden />
      </div>

      <div className="flex flex-col gap-2 my-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between gap-2 p-2 border rounded-lg"
          >
            <div className="flex flex-col">
              <span>{file.name}</span>
              <span className="text-sm text-muted-foreground">{formatFileSize(file.size)}</span>
            </div>
            <Button
              type="button"
              onClick={() => setFiles((prev) => prev.filter((el) => el.name !== file.name))}
              variant="ghost"
              disabled={isUploading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={files.length === 0 || isUploading} loading={isUploading}>
          Upload <Upload />
        </Button>
      </div>
    </form>
  )
}
