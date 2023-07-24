// Form to create new note
import React from "react";

//props from NoteState.js
function CreateNote({ textHandler, saveHandler, inputText }) {
  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Enter text..."
        onChange={textHandler}
        maxLength="150"
      ></textarea>
      <div className="note__footer">
        <span className="label"> </span>
        <button className="note__save" onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
}

export default CreateNote;