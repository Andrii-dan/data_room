import { useCallback, useEffect, useRef } from 'react'

type TouchEventsConfig = {
  /** Fired on mobile tap or desktop click */
  onTap?: () => void
  /** Fired on long press (mobile only) */
  onLongPress?: () => void
  /** Fired on double click (desktop only) */
  onDoubleClick?: () => void
}

/**
 * useTouchEvents
 *
 * A unified input handler for both desktop and mobile.
 *
 * Desktop:
 *   - double-click triggers onDoubleClick
 *
 * Mobile:
 *   - tap triggers onTap
 *   - long press triggers onLongPress (after 450ms)
 *
 * Usage:
 *   const { events } = useTouchEvents({ onTap, onLongPress, onDoubleClick })
 *   <div {...events}>...</div>
 */
export function useTouchEvents({ onTap, onDoubleClick, onLongPress }: TouchEventsConfig) {
  // store timeout ID for long press
  const timerRef = useRef<number | null>(null)

  // tracks whether long press already fired
  const longPressedRef = useRef(false)

  // simple touch device detection (cached by React execution)
  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  /**
   * POINTER DOWN
   * Start long press countdown on touch devices only.
   */
  const onPointerDown = useCallback(() => {
    if (!isTouchDevice) return

    longPressedRef.current = false

    timerRef.current = window.setTimeout(() => {
      longPressedRef.current = true
      onLongPress?.()
    }, 450)
  }, [isTouchDevice, onLongPress])

  /**
   * POINTER UP
   * Cancels long press, fires tap/click if long press didn't happen.
   */
  const onPointerUp = useCallback(() => {
    if (!isTouchDevice) return

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (!longPressedRef.current) {
      onTap?.()
    }
  }, [isTouchDevice, onTap])

  /**
   * Cleanup timeout on unmount.
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  /**
   * DESKTOP DOUBLE CLICK
   * Only allowed when NOT on touch devices.
   */
  const handleDoubleClick = useCallback(() => {
    if (!isTouchDevice) {
      onDoubleClick?.()
    }
  }, [isTouchDevice, onDoubleClick])

  return {
    isTouchDevice,
    events: {
      onPointerDown,
      onPointerUp,
      onTouchEnd: onPointerUp, // fixes Safari delayed events
      onDoubleClick: handleDoubleClick,
    },
  }
}
