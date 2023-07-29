import React, { useState } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { v4 as uuid } from "uuid";

function Note({ id, text, date, subNotes, deleteNote, updateNote }) {
  const [subNoteInput, setSubNoteInput] = useState("");

  const handleSubNoteChange = (event) => {
    setSubNoteInput(event.target.value);
  };

  const handleAddSubNote = () => {
    if (subNoteInput.trim() !== "") {
      updateNote({
        id: id, 
        text: text,
        subNotes: [
          ...subNotes,
          { id: uuid(), text: subNoteInput }
        ]
      });
      setSubNoteInput("");
    }
  };

  const deleteSubNote = (subNoteId) => {
    const updatedSubNotes = subNotes.filter((subNote) => subNote.id !== subNoteId);
    updateNote({
      id: id, 
      text: text, 
      subNotes: updatedSubNotes
    });
  };

  return (
    <div className="note">
      {/* Main note body */}
      <div className="note__body">{text}</div>

      {/* Sub-notes */}
      {subNotes && subNotes.length > 0 && (
        <div className="sub-notes">
          {subNotes.map((subNote) => (
            <div key={subNote.id} className="sub-note">
              {subNote.text}
              <RemoveCircleIcon
                className="sub-note__delete"
                onClick={() => deleteSubNote(subNote.id)}
                aria-hidden="true"
              ></RemoveCircleIcon>
            </div>
          ))}
        </div>
      )}

      {/* Note footer */}
      <div className="note__footer">
        <input
          type="text"
          value={subNoteInput}
          placeholder="Enter sub-note..."
          onChange={handleSubNoteChange}
          maxLength="150"
        />
        <button onClick={handleAddSubNote}>Add Sub-Note</button>
        <RemoveCircleIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></RemoveCircleIcon>
      </div>
    </div>
  );
}

export default Note;
