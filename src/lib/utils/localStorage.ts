/**
 * Save a value to localStorage as JSON.
 * @param key - The key to store the value under.
 * @param value - The value to store (any type).
 */
export function saveToLocalStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Error saving to localStorage key "${key}":`, err)
  }
}

/**
 * Read a value from localStorage and parse it from JSON.
 * @param key - The key to read.
 * @param defaultValue - Optional default value if key doesn't exist or parsing fails.
 * @returns The parsed value or defaultValue.
 */
export function readFromLocalStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const value = localStorage.getItem(key)
    if (!value) return defaultValue
    return JSON.parse(value) as T
  } catch (err) {
    console.error(`Error reading localStorage key "${key}":`, err)
    return defaultValue
  }
}
