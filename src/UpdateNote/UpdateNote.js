import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class UpdateNote extends React.Component {
  static contextType = ApiContext

  renderFolderDropDown = () => {
    const folders = this.context.folders
    // console.log(folders)
    // const selectedFolder = this.props.folder

    const foldersJsx = folders.map(folder => {
      // if (selectedFolder === folder.id) {
      //   return (
      //     <option key={folder.id} value={folder.id} defaultValue={true}>
      //       {folder.folder_name}
      //     </option>
      //   )
      // }
      return (
        <option key={folder.id} value={folder.id}>
          {folder.folder_name}
        </option>
      )
    })

    // console.log(foldersJsx)

    // foldersJsx.unshift(
    //   <option key={null} value=''>
    //     Pick A folder
    //   </option>
    // );
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

    fetch(`${config.REACT_APP_API_ENDPOINT}/notes/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteObject)
    })
      .then(resp => {
        // console.log(resp)
        return resp.json()
      })
      .then(data => {
        // console.log(data)
        this.context.handleUpdateNote(data[0])
        // this.props.history.goBack()
        this.props.toggleUpdate()
      })
      .catch(err => console.error(err))
  }

  render() {
    // console.log(this.props.content)
    return (
      <NotefulForm onSubmit={e => this.handleSubmit(e)}>
        <h2>Add New Note</h2>
        <label htmlFor="name"> Name:</label>
        <input
          defaultValue={this.props.title}
          type="text"
          name="label"
          id="name"
          required
        />

        <label htmlFor="content"> Content:</label>
        <input
          defaultValue={this.props.content}
          type="text"
          name="content"
          id="content"
          required
        />

        <label htmlFor="folder"> Folder:</label>
        <select
          id="folder"
          onChange={this.handleChange}
          defaultValue={this.props.folder}
          required
        >
          {this.renderFolderDropDown()}
        </select>
        <button type="submit">Submit</button>
        <button type="button" onClick={this.props.toggleUpdate}>
          Cancel
        </button>
      </NotefulForm>
    )
  }
}
