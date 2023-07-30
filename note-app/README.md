# RWAT 4 - ReactJS

A note taking app which has the following requirements:

Converted notes application to use a react application, where a user should be able to:
1. Add a note
2. Delete a note
3. Each note should be in a colored rectangular box. Box
colors can be selected from a fixed list of colors.

Also:
4. Provides child notes, which are deleted when the parent is deleted.
5. Deadline feature – order notes by deadline and mark overdue. Push back parent deadline if a child note is created with a later deadline.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## More information  

- App displays 3 notes in a row on full screen, a smaller screen would create rows of 2 and rows of 1 notes.

- The date is displayed oh the top of each note, with the text underneath. The child notes can be added under the main text area and removed by pressing the minus button to the right. 

- The whole note (parent and child if any) can be deleted by pressing the bin icon on the far right.

- The user can select a colour for each notes from the following selection: "default" (a transparent note), "lightcoral", "skyblue", "mediumaquamarine", "lightyellow".

- The notes and their add-ons will be saved in local browser storage. 

- On refresh, notes are sorted in order of date. If the date has passed, they are pushed to the top.

- To save a note or child note, the fields cannot be blank.

- To create a note: Enter text where prompted, select a date on the calendar pop-up and press save. 
This is to unsure no empty notes are saved, without a date.

The main files: 

## Note.js
The component renders the main note with text, date and any existing child notes if any.

This component uses the `useState` hook to manage the state of the `subNoteText` which has the text input for child notes
`formatDate` function = date string into human readable format
`deleteSubNote` function = deletes a child from the list of child notes
`saveSubNoteHandler` function = add a new child to list of child notes when the "Add child note" button pressed
DeleteSweepRoundedIcon = delete the whole note, and the RemoveCircleIcon = delete individual child notes; these icons are from MUI icons

## NoteState.js
Manages a list of notes and their subnotes. It also includes functionalities to create, update, and delete notes and subnotes(child notes).

`Notes()` = manages the state of notes, inputText, selectedDate, and selectedNoteId using the useState hook
The component provides functions like deleteNote, updateNote, and deleteSubNote to handle deletion and updating of notes and child notes
Renders the list of Note components, passing props for each note

`textHandler` and `dateHandler` functions = update the input text and selected date state when the user interacts with the input fields
`saveHandler` function = saves a new note or subnote if a `selectedNoteId` is present. Clears the input fields and resets selectedNoteId
`handleAddSubNote` function = add a sub-note to a specific note, sets the selectedNoteId state accordingly
Two `useEffect` hooks = for loading data from and saving data to the local storage, notes are sorted based on the date
Renders a `CreateNote` component = create new notes and child notes

## CreateNote.js
Interface for creating new notes.

`CreateNote()` component receives several props as parameters: `textHandler`, `dateHandler`, `saveHandler`, `inputText` and `selectedDate`. Managing the state and useractions when creating a new note

Renders a <div> element with class "note." which makes the background of the note transparen, using background variable

Inside <div>, the <textarea> element allows entering the text of the note. Its controlled by the `inputText` state its value is set to the value of inputText and then calls the `textHandler` function whenever the user types

Below <textarea>, a <div> element with class "note__footer" has inputs for selecting the date and the "Save" button

In "note__footer" <div>, <span> element contains an <input> element of type "date" for selecting a date. `selectedDate` state controls this, and the `dateHandler` function is called when the user changes selected date

"Save" button when clicked triggers the ``saveHandler function, which is responsible for saving the new note

