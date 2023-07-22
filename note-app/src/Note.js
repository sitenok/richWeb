import React from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Note() {
  return(
    <div className="note">
      <div className="note__body"></div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <RemoveCircleIcon
          className="note__delete"
          aria-hidden="true"
        ></RemoveCircleIcon>
      </div>
    </div>
  );
}
export default Note;