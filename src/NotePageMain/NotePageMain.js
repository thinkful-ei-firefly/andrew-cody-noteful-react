import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
// import config from '../config'
import './NotePageMain.css'
import UpdateNote from '../UpdateNote/UpdateNote'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  state = { update: false }

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  toggleUpdate = () => {
    this.setState({ update: !this.state.update })
  }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    // console.log(note)
    if (!this.state.update) {
      return (
        <section className="NotePageMain">
          <Note
            id={note.id}
            title={note.title}
            modified={note.date_modified}
            onDeleteNote={this.handleDeleteNote}
          />
          <div className="NotePageMain__content">
            <button onClick={this.toggleUpdate}>Update</button>
            {note.content
              .split('\\n')
              .join()
              .split('\\r')
              .map((para, i) => {
                // console.log(para)
                return <p key={i}>{para}</p>
              })}
            {/* <p>{note.content}</p> */}
          </div>
        </section>
      )
    } else {
      return (
        <section className="NotePageMain">
          <UpdateNote 
            id={note.id}
            folder={note.folder}
            title={note.title}
            content={note.content
              .split('\\n')
              .join()
              .split('\\r')
              .map((para, i) => {
                // console.log(para)
                return para
              })}
            toggleUpdate={this.toggleUpdate}
          />
          {/* <Note
            id={note.id}
            title={note.title}
            modified={note.date_modified}
            onDeleteNote={this.handleDeleteNote}
          />
          <div className="NotePageMain__content">
            <button onClick={this.handleUpdate}>Update</button>
            {note.content
              .split('\\n')
              .join()
              .split('\\r')
              .map((para, i) => {
                // console.log(para)
                return <p key={i}>{para}</p>
              })}
          </div> */}
        </section>
      )
    }
  }
}
