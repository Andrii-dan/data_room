/**
 * Sets the document title for the Data Room.
 * If no title is provided, only "Data Room" is used.
 */
export function setDocumentTitle(name?: string | null) {
  if (name && name.trim()) {
    document.title = `${name} - Data Room`
  } else {
    document.title = 'Data Room'
  }
}
