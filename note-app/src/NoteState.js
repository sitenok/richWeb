import React, { useState, useEffect } from "react";
import "./Note.css";
import Note from "./Note.js";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";

function Notes() {
  const [notes, setNotes] = useState([]); // store notes as an array
  const [inputText, setInputText] = useState(""); //store the input text
  const [currentNoteId, setCurrentNoteId] = useState(null); // track the current main note id for adding sub-notes

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const saveHandler = () => {
    if (inputText.trim() !== "") {
      // If inputText is not empty, it's a main note
      setNotes((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: inputText,
          subNotes: [], // Initialize subNotes as an empty array
        },
      ]);
      // Clear textarea
      setInputText("");
    } else {
      // If inputText is empty, it's a sub-note
      // We need to find the main note to which this sub-note belongs
      const updatedNotes = notes.map((note) => {
        if (note.id === currentNoteId) {
          return {
            ...note,
            subNotes: [...note.subNotes, { id: uuid(), text: inputText }],
          };
        }
        return note;
      });
      setNotes(updatedNotes);
      // Clear textarea
      setInputText("");
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleAddSubNote = (noteId) => {
    setCurrentNoteId(noteId);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          subNotes={note.subNotes || []} // Ensure subNotes is an array
          deleteNote={deleteNote}
          updateNote={updateNote}
          handleAddSubNote={handleAddSubNote}
        />
      ))}

      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
}

export default Notes;
