import type { FileItem, FolderItem, SortBy, SortOrder } from '@/lib'

/**
 * Filters and sorts an array of FileItem or FolderItem.
 *
 * @param items - The array of items (files or folders) to process.
 * @param searchQuery - A string to filter items by name (case-insensitive).
 * @param sortBy - The field to sort by. Defaults to 'name'.
 * @param order - The sort order: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
 * @returns A new array of items filtered by name and sorted according to sortBy and order.
 *
 * Example usage:
 * const result = filterAndSortItems(folders, 'project', 'createdAt', 'desc')
 */
export function filterAndSortItems<T extends FileItem | FolderItem>(
  items: T[],
  searchQuery: string,
  sortBy: SortBy = 'name',
  order: SortOrder = 'asc',
): T[] {
  const lowerQuery = searchQuery.toLowerCase().trim()

  const filtered = items.filter((item) => item.name.toLowerCase().includes(lowerQuery))

  const sorted = filtered.sort((a, b) => {
    let valA: string | number = ''
    let valB: string | number = ''

    switch (sortBy) {
      case 'name':
        valA = a.name.toLowerCase()
        valB = b.name.toLowerCase()
        break
      case 'createdAt':
        valA = a.createdAt
        valB = b.createdAt
        break
      case 'updatedAt':
        valA = a.updatedAt
        valB = b.updatedAt
        break
    }

    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}
