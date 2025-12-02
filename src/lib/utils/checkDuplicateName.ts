import type { FileItem, FolderItem } from '../types'

/**
 * Checks if a name already exists among sibling items (case-insensitive)
 * @param name - The name to check
 * @param siblings - Array of sibling items (files or folders)
 * @returns true if name exists, false otherwise
 */
export const checkDuplicateName = (name: string, siblings: FolderItem[] | FileItem[]): boolean => {
  const lowerName = name.toLowerCase()
  return siblings.some((item) => item.name.toLowerCase() === lowerName)
}
