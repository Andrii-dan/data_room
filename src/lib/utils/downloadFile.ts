import toast from 'react-hot-toast'

export function downloadFile(url: string | null, filename: string) {
  if (!url) {
    toast.error('Unable to download the file. File URL is missing.')
    return
  }

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
