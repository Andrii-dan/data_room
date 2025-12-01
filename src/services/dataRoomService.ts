import { mutationOptions, queryOptions } from '@tanstack/react-query'

import { addFile, addFolder, deleteItem, fetchItems, type FileItem } from '@/lib'

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
    mutationFn: (file: FileItem) => addFile(file),
  })

export const removeItem = () =>
  mutationOptions({
    mutationKey: ['delete-item'],
    mutationFn: ({ store, id }: { store: 'folders' | 'files'; id: string }) =>
      deleteItem(store, id),
  })
