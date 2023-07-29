/* Page title */
import React from "react";

function Header() {
  return (
    <div className="header">
      <h1 className="notes__title">Notes</h1>
      <br></br>
      <h5>To save a note or child note, the fields cannot be blank.</h5>
      <h5>Please 1.Enter text 2.Select a date and 3.Press save</h5>
    </div>
  );
}
export default Header;