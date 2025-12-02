import { mutationOptions, queryOptions } from '@tanstack/react-query'

import type { Store } from '@/lib'
import { addFile, addFolder, deleteItem, fetchItems, renameItem } from '@/store'

export const dataRoomKeys = {
  items: (parentId: string | null) => ['get-items', parentId],
}

export const getItems = (parentId: string | null = null) =>
  queryOptions({
    queryKey: dataRoomKeys.items(parentId),
    queryFn: () => fetchItems(parentId),
  })

export const createFolder = () =>
  mutationOptions({
    mutationKey: ['create-folder'],
    mutationFn: ({ folderName, parentId }: { folderName: string; parentId: string | null }) =>
      addFolder(folderName, parentId),
  })

export const uploadFile = () =>
  mutationOptions({
    mutationKey: ['upload-file'],
    mutationFn: ({ file, parentId }: { file: File; parentId?: string | null }) =>
      addFile(file, parentId),
  })

export const removeItem = () =>
  mutationOptions({
    mutationKey: ['delete-item'],
    mutationFn: ({ store, id }: { store: Store; id: string }) => deleteItem(store, id),
  })

export const changeItemName = () =>
  mutationOptions({
    mutationKey: ['rename-item'],
    mutationFn: ({ store, id, newName }: { store: Store; id: string; newName: string }) =>
      renameItem(store, id, newName),
  })
