/**
 * Generates a unique file name by appending a counter if a file with the same name already exists.
 *
 * Example:
 *   - existingNames = ['file.txt', 'file (1).txt']
 *   - fileName = 'file.txt'
 *   - returns 'file (2).txt'
 *
 * @param fileName - The original file name to make unique.
 * @param existingNames - Array of file names that already exist in the target folder.
 * @returns A unique file name that does not collide with existingNames.
 */
export const getUniqueFileName = (fileName: string, existingNames: string[]): string => {
  const nameParts = fileName.split('.')
  const extension = nameParts.length > 1 ? '.' + nameParts.pop() : ''
  const baseName = nameParts.join('.')

  let newName = fileName
  let counter = 1

  const lowerExisting = existingNames.map((n) => n.toLowerCase())

  while (lowerExisting.includes(newName.toLowerCase())) {
    newName = `${baseName} (${counter})${extension}`
    counter++
  }

  return newName
}
