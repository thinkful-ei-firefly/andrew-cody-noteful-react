import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import ApiContext from "../ApiContext";
import config from "../config";
import "./App.css";
import AddFolderForm from "../AddFolderForm/AddFolderForm";
import AddNote from "../AddNote/AddNote";
import ErrorAddFolder from "../Errors/ErrorAddFolder";
import ErrorAddNote from "../Errors/ErrorAddNote";
// import UpdateNote from "../UpdateNote/UpdateNote";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.REACT_APP_API_ENDPOINT}/notes`),
      fetch(`${config.REACT_APP_API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleDeleteFolder = folderId => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId)
    })
  }

  handleAddFolder = folder => {
    // console.log('app: ', folder)
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  handleUpdateNote = note => {
    this.handleDeleteNote(note.id)
    this.handleAddNote(note)
  }

  handleUpdateFolder = (folder) => {
    this.handleDeleteFolder(folder.id)
    this.handleAddFolder(folder)
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route exact path="/note/:noteId" component={NotePageMain} />
        <ErrorAddFolder>
          <Route exact path="/add-folder" component={AddFolderForm} />
        </ErrorAddFolder>
        <ErrorAddNote>
          <Route path="/add-note" component={AddNote} />
        </ErrorAddNote>
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
      handleUpdateNote: this.handleUpdateNote,
      handleUpdateFolder: this.handleUpdateFolder,
      handleDeleteFolder: this.handleDeleteFolder
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
