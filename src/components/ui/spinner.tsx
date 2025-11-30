import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

type SpinnerProps = React.ComponentProps<'svg'> & {
  fullScreen?: boolean
}

function Spinner({ className, fullScreen = false, ...props }: SpinnerProps) {
  const spinner = (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('animate-spin text-primary', fullScreen ? 'size-12' : 'size-4', className)}
      {...props}
    />
  )

  if (!fullScreen) return spinner

  return <div className="fixed inset-0 flex items-center justify-center z-50">{spinner}</div>
}

export { Spinner }
