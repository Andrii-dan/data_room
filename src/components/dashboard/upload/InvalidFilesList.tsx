import { Button } from '@/components/ui/button'
import { TextTruncate } from '@/components/ui/text-truncate'
import { formatFileSize, type InvalidFile } from '@/lib'

type Props = {
  invalidFiles: InvalidFile[]
  clear: VoidFunction
}

export function InvalidFileList({ invalidFiles, clear }: Props) {
  return (
    <div className="space-y-2">
      <h4 className="flex items-center justify-between text-destructive">
        <span className="font-medium">{`Invalid files (${invalidFiles.length})`}</span>
        <Button type="button" size="sm" onClick={clear} variant="ghost">
          Clear
        </Button>
      </h4>

      <ul className="space-y-2">
        {invalidFiles.map(({ file, reason }) => (
          <li
            key={file.name}
            className="flex items-center justify-between gap-2 p-2 border border-destructive rounded-lg"
          >
            <div className="flex flex-col">
              <TextTruncate text={file.name} />
              <span className="text-xs text-destructive">{reason}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
