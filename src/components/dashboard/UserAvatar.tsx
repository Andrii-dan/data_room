import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

type Props = {
  src?: string
  alt?: string
}

export const UserAvatar = React.memo(({ src, alt }: Props) => {
  const [error, setError] = useState(false)
  const showFallback = error || !src

  return showFallback ? (
    <FaRegUserCircle className="w-9 h-9 p-1 text-white/70" />
  ) : (
    <img
      src={src}
      alt={alt}
      className="w-9 h-9 rounded-full p-1 bg-primary/60"
      onError={() => setError(true)}
    />
  )
})
