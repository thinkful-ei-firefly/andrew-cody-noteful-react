import React from 'react'
import config from '../config'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'

class AddFolderForm extends React.Component {
  static contextType = ApiContext

  buttonClickListener(e) {
    e.preventDefault()
    const folderName = e.target.name.value
    const folder = { name: folderName }
    // console.log(folder)
    fetch(`${config.REACT_APP_API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log('data', data)
        this.context.handleAddFolder(data[0])
        this.props.history.push('/')
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <NotefulForm onSubmit={e => this.buttonClickListener(e)}>
        <h2>Add Folder</h2>
        <label htmlFor="name">Folder Name:</label>
        <input type="text" name="name" id="folder-name" />
        <button type="submit">Submit</button>
      </NotefulForm>
    )
  }
}

export default AddFolderForm
