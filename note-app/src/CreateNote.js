import React from "react";

function CreateNote({ textHandler, dateHandler, saveHandler, inputText, selectedDate }) {
  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Enter text..."
        onChange={textHandler}
        maxLength="150"
      />
      <div className="note__footer">
        <span className="label">
          <input type="date" value={selectedDate} onChange={dateHandler} />
        </span>
        <button className="note__save" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
