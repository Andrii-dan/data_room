import type { IconType } from 'react-icons'
import {
  FaFile,
  FaFileAlt,
  FaFileAudio,
  FaFileCode,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
} from 'react-icons/fa'

interface FilePreviewInfo {
  previewable: boolean
  icon: IconType
  colorClass: string
}

/**
 * Returns previewable status and icon based on MIME type or file extension
 */
export function getFilePreviewInfo(fileType: string | undefined): FilePreviewInfo {
  if (!fileType)
    return { previewable: false, icon: FaFile, colorClass: 'text-gray-500 dark:text-gray-400' }

  switch (true) {
    case fileType.startsWith('image/'):
    case fileType === 'image/svg+xml':
      return {
        previewable: true,
        icon: FaFileImage,
        colorClass: 'text-blue-500 dark:text-blue-400',
      }

    case fileType === 'application/pdf':
      return { previewable: true, icon: FaFilePdf, colorClass: 'text-red-500 dark:text-red-400' }

    case fileType.startsWith('text/'):
      return {
        previewable: true,
        icon: FaFileCode,
        colorClass: 'text-amber-500 dark:text-amber-400',
      }

    case fileType.startsWith('audio/'):
      return {
        previewable: true,
        icon: FaFileAudio,
        colorClass: 'text-green-500 dark:text-green-400',
      }

    case fileType.startsWith('video/'):
      return {
        previewable: true,
        icon: FaFileVideo,
        colorClass: 'text-purple-500 dark:text-purple-400',
      }

    case fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return {
        previewable: false,
        icon: FaFileWord,
        colorClass: 'text-indigo-500 dark:text-indigo-400',
      }

    case fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return {
        previewable: false,
        icon: FaFileExcel,
        colorClass: 'text-indigo-500 dark:text-indigo-400',
      }

    case fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return {
        previewable: false,
        icon: FaFilePowerpoint,
        colorClass: 'text-indigo-500 dark:text-indigo-400',
      }

    default:
      return { previewable: false, icon: FaFileAlt, colorClass: 'text-gray-500 dark:text-gray-400' }
  }
}
