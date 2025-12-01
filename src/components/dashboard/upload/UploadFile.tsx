import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'
import { Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDialog } from '@/context'
import { useUploadFile } from '@/hooks'
import { type InvalidFile, mergeUniqueFiles, mergeUniqueInvalidFiles, validateFiles } from '@/lib'

import { InvalidFileList } from './InvalidFilesList'
import { UploadDropzone } from './UploadDropzone'
import { UploadFileList } from './UploadFileList'

export function UploadFile() {
  const [files, setFiles] = useState<File[]>([])
  const [invalidFiles, setInvalidFiles] = useState<InvalidFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const { folderId: parentId } = useParams()
  const { closeDialog } = useDialog()
  const { uploadFiles, isUploading } = useUploadFile(parentId)

  const handleFileChange = (incomingFiles: FileList | null) => {
    if (!incomingFiles?.length) return

    const incoming = Array.from(incomingFiles)
    const { valid, invalid } = validateFiles(incoming)

    if (invalid.length > 0) {
      toast.error("Some files couldn't be added")
      setInvalidFiles((prev) => mergeUniqueInvalidFiles(prev, invalid))
    }

    setFiles((prev) => mergeUniqueFiles(prev, valid))
  }

  const removeFile = (name: string) => setFiles((prev) => prev.filter((file) => file.name !== name))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    uploadFiles(files, closeDialog)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <UploadDropzone
        isDragOver={isDragOver}
        inputRef={inputRef}
        onSelectFiles={handleFileChange}
        setIsDragOver={setIsDragOver}
      />

      {/* Files to be upload  */}
      {files.length > 0 && (
        <UploadFileList files={files} isUploading={isUploading} removeFile={removeFile} />
      )}

      {/* Invalid files  */}
      {invalidFiles.length > 0 && (
        <InvalidFileList invalidFiles={invalidFiles} clear={() => setInvalidFiles([])} />
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={files.length === 0 || isUploading} loading={isUploading}>
          Upload <Upload />
        </Button>
      </div>
    </form>
  )
}
