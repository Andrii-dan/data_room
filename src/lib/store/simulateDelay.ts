/**
 * Simulates a delay for async operations.
 * @param ms - milliseconds to delay (default 500ms)
 */
export const simulateDelay = (ms = 500) => new Promise<void>((resolve) => setTimeout(resolve, ms))
