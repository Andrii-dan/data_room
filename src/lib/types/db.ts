export interface FileItem {
  id: string
  name: string
  type: 'file'
  parentId: string | null // null = root folder
  file: Blob
  fileType: string
  createdAt: number
  updatedAt: number
}

export interface FolderItem {
  id: string
  name: string
  type: 'folder'
  parentId: string | null
  createdAt: number
  updatedAt: number
}
