import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TextTruncate } from '@/components/ui/text-truncate'
import { formatFileSize } from '@/lib'

type Props = {
  files: File[]
  isUploading: boolean
  removeFile: (name: string) => void
}

export function UploadFileList({ files, isUploading, removeFile }: Props) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium">{`Files to upload (${files.length})`}</h4>

      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.name}
            className="flex items-center justify-between gap-2 p-2 border rounded-lg"
          >
            <TextTruncate text={file.name} />

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>

              <Button
                type="button"
                onClick={() => removeFile(file.name)}
                variant="ghost"
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
