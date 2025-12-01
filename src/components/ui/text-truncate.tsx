type Props = {
  text: string
  maxLength?: number
  className?: string
}

export function TextTruncate({ text, maxLength = 40, className }: Props) {
  const isTooLong = text.length > maxLength
  const displayText = isTooLong ? `${text.slice(0, maxLength)}...` : text

  return (
    <span className={className} title={isTooLong ? text : undefined}>
      {displayText}
    </span>
  )
}
