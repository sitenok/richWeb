// Functions and states of notes
import React, {useState, useEffect } from "react";
import "./Note.css";
import Note from "./Note.js";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";

// 

function Notes() {
  //states
  const [notes, setNotes] = useState([]); // store notes as an array
  const [inputText, setInputText] = useState(""); //store the input text

  // get text and set to iinput state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // create new (note)object in state array with user's input and unique ID 
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    //clear textarea
    setInputText("");
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  // save note to local browser storage
  //stringify = convert objects to a string
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []); // empty - get data once

  return (
    <div className="notes">
      {/* map() creats a new array, calls a function for every array element */}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
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

