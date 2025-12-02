import { openDB } from 'idb'
import { v4 as uuidv4 } from 'uuid'

import { checkDuplicateName, getUniqueFileName } from '@/lib'
import type { FileItem, FolderItem, Store } from '@/lib/types'

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
  const currentFolder: FolderItem = allFolders.find((f) => f.id === parentId)

  return { folders, files, currentFolder }
}

export const addFolder = async (folderName: string, parentId: string | null = null) => {
  const db = await dbPromise
  await simulateDelay()

  // Get all folders under the same parent
  const allFolders: FolderItem[] = await db.getAll('folders')
  const siblingFolders = allFolders.filter((f) => f.parentId === parentId)

  const exists = checkDuplicateName(folderName, siblingFolders)

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

export const addFile = async (file: File, parentId: string | null = null) => {
  const db = await dbPromise
  await simulateDelay()

  const allFiles: FileItem[] = await db.getAll('files')
  const existingNames = allFiles.filter((f) => f.parentId === parentId).map((f) => f.name)

  const uniqueName = getUniqueFileName(file.name, existingNames)

  const fileItem: FileItem = {
    id: uuidv4(),
    name: uniqueName,
    type: 'file',
    parentId,
    file,
    fileType: file.type,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  await db.put('files', fileItem)
  return fileItem
}

export const deleteItem = async (store: Store, id: string) => {
  await simulateDelay()
  const db = await dbPromise
  await db.delete(store, id)
}

export const renameItem = async (store: Store, id: string, newName: string) => {
  const db = await dbPromise
  await simulateDelay()

  // Fetch the item to rename
  const item = await db.get(store, id)
  if (!item) throw new Error('Item not found')

  // Fetch all items of the same type under the same parent
  const allItems = await db.getAll(store)
  const siblingItems = allItems.filter((i) => i.parentId === item.parentId && i.id !== id)

  const exists = checkDuplicateName(newName, siblingItems)

  if (exists) {
    throw new Error(
      `Oops! A ${store === 'folders' ? 'folder' : 'file'} named "${newName}" already exists here.`,
    )
  }

  // Update the item's name and timestamp
  const updatedItem = { ...item, name: newName, updatedAt: Date.now() }

  await db.put(store, updatedItem)
  return updatedItem
}

export const getFolderParents = async (folderId: string | null) => {
  if (!folderId) return []

  const db = await dbPromise
  const breadcrumbs: FolderItem[] = []

  let currentId: string | null = folderId

  while (currentId) {
    const folder: FolderItem | undefined = await db.get('folders', currentId)
    if (!folder) break

    breadcrumbs.push(folder)
    currentId = folder.parentId
  }

  return breadcrumbs.reverse()
}
