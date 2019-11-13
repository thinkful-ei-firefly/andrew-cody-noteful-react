import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends React.Component {
  static contextType = ApiContext

  renderFolderDropDown = () => {
    const folders = this.context.folders
    // console.log(folders)

    const foldersJsx = folders.map(folder => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.folder_name}
        </option>
      )
    })

    // console.log(foldersJsx)

    foldersJsx.unshift(
      <option key={null} value="">
        Pick A folder
      </option>
    )
    return foldersJsx
  }

  handleSubmit(e) {
    e.preventDefault()
    const noteName = e.target.name.value
    const noteContent = e.target.content.value
    const folderId = e.target.folder.value

    const noteObject = {
      name: noteName,
      content: noteContent,
      folderId: folderId
    }

    fetch(`${config.REACT_APP_API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteObject)
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        this.context.handleAddNote(data[0])
        this.props.history.goBack()
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <NotefulForm onSubmit={e => this.handleSubmit(e)}>
        <h2>Add New Note</h2>
        <label htmlFor="name"> Name:</label>
        <input type="text" name="label" id="name" required />

        <label htmlFor="content"> Content:</label>
        <input type="text" name="content" id="content" required />

        <label htmlFor="folder"> Folder:</label>
        <select id="folder" onChange={this.handleChange} required>
          {this.renderFolderDropDown()}
        </select>
        <button type="submit">Submit</button>
      </NotefulForm>
    )
  }
}
