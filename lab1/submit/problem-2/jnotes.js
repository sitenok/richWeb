// reference to main application container
const notesContainer = document.getElementById("app"); // div "app" in html
const addNoteButton = notesContainer.querySelector(".add-note"); // button to add new note

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// Get existing notes from browser storage
function getNotes() {
  // returns array of js objects (parse - changes json to js array)
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Array of notes, save new note to local storage (the getNotes array)
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Build new (HTML text area)element to represent a note
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note"); // applies css rules .note
  element.value = content; 
  element.placeholder = "Empty Note";

  // when user changes contents
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Add new note to HTML & save to local storage
function addNote() {
  const notes = getNotes();
  // create new object + id
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  // append new note to array of notes
  notes.push(noteObject);
  saveNotes(notes);
}


function updateNote(id, newContent) {
  const notes = getNotes();
  // filter through array & find note with id to update
  const targetNote = notes.filter((note) => note.id == id)[0]; // array of single element

  targetNote.content = newContent;
  saveNotes(notes);
}

// id + html element which represent specific note
function deleteNote(id, element) {
  // filter + make a new array w all the notes not equal to id
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}


// local storage saves in key value pairs & as strings (json - string)
