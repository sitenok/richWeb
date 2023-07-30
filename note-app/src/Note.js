import React, { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import { v4 as uuid } from "uuid";


function Note({ id, text, date, subNotes, deleteNote, updateNote, notecolour,selectedcolour, colours, oncolourChange }) {
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [subNoteText, setSubNoteText] = useState(""); // handle sub-note text input

  const deleteSubNote = (subNoteId) => {
    const updatedSubNotes = subNotes.filter((subNote) => subNote.id !== subNoteId);
    updateNote({
      id,
      text,
      date,
      subNotes: updatedSubNotes,
    });
  };

  const saveSubNoteHandler = () => {
    if (subNoteText.trim() !== "") {
      updateNote({
        id,
        text,
        date,
        subNotes: [
          ...subNotes,
          {
            id: uuid(),
            text: subNoteText,
          },
        ],
      });
      setSubNoteText("");
    }
  };

  const colourChangeHandler = (e) => {
    oncolourChange(id, e.target.value);
  };

  return (
    <div className="note" style={{ background: notecolour }}>
      <div className="note__date">{formatDate(date)}</div>
      <div className="note__body">{text}</div>

      {subNotes && subNotes.length > 0 && (
        <div className="sub-notes">
          {subNotes.map((subNote) => (
            <div key={subNote.id} className="sub-note">
              {subNote.text}
              <RemoveCircleIcon
                className="note__delete"
                onClick={() => deleteSubNote(subNote.id)}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      )}

      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
      <div className="sub-note__input">
          <input
            type="text"
            placeholder="Enter child note..."
            value={subNoteText}
            onChange={(e) => setSubNoteText(e.target.value)}
          />
          <button className="note__add-sub-note" onClick={saveSubNoteHandler}>
            Add child note
          </button>
        </div>
        
        <DeleteSweepRoundedIcon className="note__delete" onClick={() => deleteNote(id)} aria-hidden="true" />
        
      </div>

      <div className="colour-picker">
        <label>Select Note colour:</label>
        <select value={selectedcolour} onChange={colourChangeHandler}>
          {colours.map((colour) => (
            <option key={colour} value={colour}>
              {colour}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

export default Note;
