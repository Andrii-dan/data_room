import { openDB } from 'idb'
import { v4 as uuidv4 } from 'uuid'

import type { FileItem, FolderItem } from '../types'
import { simulateDelay } from './simulateDelay'

export const dbPromise = openDB('dataroom', 1, {
  upgrade(db) {
    db.createObjectStore('folders', { keyPath: 'id' })
    db.createObjectStore('files', { keyPath: 'id' })
  },
})

export const fetchItems = async (parentId: string | null = null) => {
  const db = await dbPromise
  await simulateDelay()

  const [allFolders, allFiles] = await Promise.all([db.getAll('folders'), db.getAll('files')])

  const folders: FolderItem[] = allFolders.filter((f) => f.parentId === parentId)
  const files: FileItem[] = allFiles.filter((f) => f.parentId === parentId)

  return { folders, files }
}

export const addFolder = async (folderName: string, parentId: string | null = null) => {
  const db = await dbPromise
  await simulateDelay()

  // Get all folders under the same parent
  const allFolders: FolderItem[] = await db.getAll('folders')
  const siblingFolders = allFolders.filter((f) => f.parentId === parentId)

  // Check for duplicate name (case insensitive)
  const exists = siblingFolders.some(
    (f) => f.name.toLocaleLowerCase() === folderName.toLocaleLowerCase(),
  )

  if (exists) {
    throw new Error(
      `Oops! A folder named "${folderName}" already exists here. Try a different name.`,
    )
  }

  const folder: FolderItem = {
    id: uuidv4(),
    name: folderName,
    type: 'folder',
    parentId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  await db.put('folders', folder)
  return folder
}

export const addFile = async (file: FileItem) => {
  const db = await dbPromise
  await simulateDelay()
  await db.put('files', file)
}

export const deleteItem = async (store: 'folders' | 'files', id: string) => {
  await simulateDelay()
  const db = await dbPromise
  await db.delete(store, id)
}
