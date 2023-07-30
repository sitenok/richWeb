import React, { useState, useEffect } from "react";
import "./Note.css";
import Note from "./Note.js";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";

function Notes() { 
  const colours = ["default", "red", "blue", "green", "yellow"];

  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedcolour, setSelectedcolour] = useState(colours[0]);

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const dateHandler = (e) => {
    setSelectedDate(e.target.value);
  };

  const saveHandler = () => {
    if (inputText.trim() !== "" && selectedDate.trim() !== "") {
      if (selectedNoteId) {
        // If selectedNoteId is present, it's a sub-note
        const updatedNotes = notes.map((note) => {
          if (note.id === selectedNoteId) {
            return {
              ...note,
              subNotes: [
                ...(note.subNotes || []),
                {
                  id: uuid(),
                  text: inputText,
                },
              ],
            };
          }
          return note;
        });
        setNotes(updatedNotes);
      } else {
        // If selectedNoteId is not present, it's a main note
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            id: uuid(),
            text: inputText,
            date: selectedDate,
            subNotes: [],
          },
        ]);
      }

      // Clear textarea and date input
      setInputText("");
      setSelectedDate("");
      setSelectedNoteId(null);
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

  const deleteSubNote = (noteId, subNoteId) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const updatedSubNotes = note.subNotes.filter((subNote) => subNote.id !== subNoteId);
        return { ...note, subNotes: updatedSubNotes };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleAddSubNote = (noteId) => {
    setSelectedDate("");
    setInputText("");
    setSelectedNoteId(noteId);
  };

  const colourChangeHandler = (noteId, colour) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, notecolour: colour } : note
    );
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      // Sort the notes based on the date
      const currentDate = new Date();
      const sortedNotes = data.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
  
        // Sort notes with dates in the past in ascending order (oldest date comes first)
        if (aDate < currentDate && bDate < currentDate) {
          return aDate - bDate;
        }
  
        // For notes with dates in the future or the current date, sort in descending order (latest date comes first)
        return bDate - aDate;
      });
  
      setNotes(sortedNotes);
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
          date={note.date}
          subNotes={note.subNotes || []}
          deleteNote={deleteNote}
          updateNote={updateNote}
          deleteSubNote={deleteSubNote}
          handleAddSubNote={handleAddSubNote}
          // colourChangeHandler={colourChangeHandler}
          notecolour={note.notecolour || colours[0]} // default colour if not set
          selectedcolour={selectedcolour}
          colours={colours}
          oncolourChange={colourChangeHandler}
        />
      ))}

      <CreateNote
        textHandler={textHandler}
        dateHandler={dateHandler}
        saveHandler={saveHandler}
        inputText={inputText}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default Notes;
