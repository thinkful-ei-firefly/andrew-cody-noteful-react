import React from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import config from '../config'

export default class FolderCard extends React.Component {
  static contextType = ApiContext

  state = { update: false }

  toggleUpdate = () => {
    this.setState({ update: !this.state.update })
  }

  handleDelete = () => {
    const folderId = this.props.folderId
    fetch(`${config.API_ENDPOINT}/folders/${this.props.folderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({folderId})
    })
      .then(resp => {
        // console.log(resp)
        return resp.json()
      })
      .then(data => {
        console.log(data)
        this.context.handleDeleteFolder(data[0].id)
    
      })
      .catch(err => console.error(err))
  }

  handleUpdateSubmit = e => {
    e.preventDefault()
    const folder_name = e.target.folder.value
    const folderId = this.props.folderId

    // const updatedFolder = {
    //   // id: folderId,
    //   folder_name
    // }

    fetch(`${config.API_ENDPOINT}/folders/${this.props.folderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({folder_name, id: folderId})
    })
      .then(resp => {
        // console.log(resp)
        return resp.json()
      })
      .then(data => {
        // console.log(data)
        this.context.handleUpdateFolder(data[0])
    
      })
      .catch(err => console.error(err))

      this.toggleUpdate()
  }

  render() {
    const { notes } = this.context

    if (!this.state.update) {
      return (
        <li>
          <NavLink
            className="NoteListNav__folder-link"
            to={`/folder/${this.props.folderId}`}
          >
            <span className="NoteListNav__num-notes">
              {countNotesForFolder(notes, this.props.folderId)}
            </span>
            {this.props.folderName}
            <button onClick={this.toggleUpdate}>update</button>
            <button onClick={this.handleDelete}>Delete</button>
          </NavLink>
        </li>
      )
    }
    return (
      <li className="NoteListNav__folder-link">
          <span className="NoteListNav__num-notes">
            {countNotesForFolder(notes, this.props.folderId)}
          </span>

          <form onSubmit={e => this.handleUpdateSubmit(e)}>
            <input
              type="text"
              name="folder"
              id="folder"
              defaultValue={this.props.folderName}
              required
            />
          
            <button>Submit</button>
          </form>

          {/* {this.props.folderName} */}
          <button onClick={this.toggleUpdate}>Cancel</button>
      </li>
    )
  }
}
