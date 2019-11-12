import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import FolderCard from '../FolderCard/FolderCard'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext

  render() {
    const { folders } = this.context
    // console.log(this.props.match.params)

    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {folders.map(
            folder => (
              <FolderCard
                key={folder.id}
                folderId={folder.id}
                folderName={folder.folder_name}
              />
            )
            // <li key={folder.id}>
            //   <NavLink
            //     className='NoteListNav__folder-link'
            //     to={`/folder/${folder.id}`}
            //   >
            //     <span className='NoteListNav__num-notes'>
            //       {countNotesForFolder(notes, folder.id)}
            //     </span>
            //     {folder.folder_name}
            //     <button>update</button>
            //   </NavLink>
            // </li>
          )}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            tag={Link}
            to="/add-folder"
            type="button"
            className="NoteListNav__add-folder-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
