import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { noteskeeper_backend } from "../../../declarations/noteskeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {  
    try {
      noteskeeper_backend.createNote(newNote.title, newNote.content);
    } catch (error) {
      console.log(error)
    }
    setNotes(prevNotes => {
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    try {
      noteskeeper_backend.removeNote(id);
    } catch (error) {
      console.log(error)
    }
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  async function fetchData() {
    try {
      const notes = await noteskeeper_backend.readNotes();
      setNotes(notes);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      fetchData();
  },[]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
