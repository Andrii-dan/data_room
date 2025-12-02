import toast from 'react-hot-toast'

export function previewFile(url?: string | null) {
  if (!url) {
    toast.error('Unable to preview the file. File URL is missing.')
    return
  }

  try {
    const opened = window.open(url, '_blank')

    if (!opened) {
      // Browser blocked popup
      toast.error('Preview blocked by your browser. Enable pop-ups and try again.')
      return
    }
  } catch (err) {
    console.error('File preview error:', err)
    toast.error('Something went wrong while opening the preview.')
  }
}
