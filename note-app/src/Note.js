// Layout of one note: body = input text, footer = remove/add icon, charcter count
import React from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//props from NoteState.js
function Note({ id, text, deleteNote }) {
  return(
    <div className="note">
      <div className="note__body">{text}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
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