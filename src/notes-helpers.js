export const findFolder = (folders = [], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes = [], noteId) => {
  noteId = parseInt(noteId)
  return notes.find(note => note.id === noteId)
}

export const getNotesForFolder = (notes = [], folderId) => {
  // console.log(notes, folderId)
  if (!folderId) {
    return notes
  }
  folderId = parseInt(folderId)
  let filteredNotes = notes.filter(note => {
    return note.folder === folderId
  })
  return filteredNotes
}

export const countNotesForFolder = (notes = [], folderId) => {
  // console.log(notes, folderId)
  return notes.filter(note => note.folder === folderId).length
}
