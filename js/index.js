// Declaring necessary variables
let noteNumber = 1;
const newNoteButton = document.querySelector('.text-container button');
const noteField = document.querySelector('.text-container input[type="text"]');
const container = document.querySelector('.result-container');
console.log("Made by Ronnie.. yeyyyy");
// localStorage.clear()

// Removes the chosen note
function removeNote(e) {
  const target = e.target;
  if (target.classList.contains('delete') || target.classList.contains('fa-times')) {

    // initialazing note variable appropriately to the clicked object's className
    let note;
    if (target.classList.contains('delete')) note = target.parentNode.parentNode
    else note = target.parentNode.parentNode.parentNode;

    localStorage.removeItem(note.id);
    note.parentNode.removeChild(note);
    --noteNumber;

    // if there's no notes then the message pops up
    if (container.childElementCount === 1)
      document.querySelector('.no-notes').style.transform = 'translate(-50%, -50%) scale(1)';

      // if the clicked element is the "done" button then the color of the font and background changes
  } else if (target.classList.contains('done') || target.classList.contains('fa-check')) {

    // initialazing note variable appropriately to the clicked object's className
    let note;
    if (target.classList.contains('done')) note = target.parentNode.parentNode;
    else note = target.parentNode.parentNode.parentNode;

    if (note.style.backgroundColor) {
      note.style.backgroundColor = null;
      note.style.color = null;
    } else {
      note.style.backgroundColor = 'rgb(46, 204, 113)';
      note.style.color = 'rgb(255, 255, 255)';
    }
  }
}

// Adds a new note
function newNote() {

  // Creating new DOM elements - note, button container, delete button
  const note = document.createElement('div');
  const btns = document.createElement('div');
  const deleteButton = document.createElement('div');
  const doneButton = document.createElement('div');

  const deleteSign = document.createElement('i');
  const doneSign = document.createElement('i');
  const paragraph = document.createElement('p');

  // setting appropriate class atributes to the elements
  note.className = 'note';
  note.id = 'note' + noteNumber;

  btns.className = 'btns';
  deleteButton.classList.add('btn', 'delete');
  doneButton.classList.add('btn', 'done');

  doneSign.classList.add('fas', 'fa-check');
  deleteSign.classList.add('fas', 'fa-times');

  // passing new data to the database (pffff database) and inserting it to the <p> DOM object and displaying it
  if (localStorage.getItem('note' + noteNumber)) {
    paragraph.textContent = localStorage.getItem('note' + noteNumber);
  } else {
    localStorage.setItem('note' + noteNumber, noteField.value);
    paragraph.textContent = localStorage.getItem('note' + noteNumber);
  }
  ++noteNumber;

  // appending child nodes into their parent nodes
  doneButton.appendChild(doneSign);
  deleteButton.appendChild(deleteSign);

  btns.appendChild(doneButton);
  btns.appendChild(deleteButton);
  note.appendChild(btns);
  note.appendChild(paragraph);

  container.appendChild(note);

  // The message which says about the number of your notes - disappears
  document.querySelector('.no-notes').style.transform = 'translate(-50%, -50%) scale(0)';
}

// check if the notes exist - if so then display them on the screen
function checkNote() {
  if (localStorage.length) {
    for (let i = 0; i < localStorage.length; i++) {
      newNote();
    }
  }
}

// setting down event listeners
window.addEventListener('load', function() {
  checkNote();
}, false);
container.addEventListener('click', removeNote, false);
newNoteButton.addEventListener('click', function() {

  // checks if the value of the field is not empty
  if (!!noteField.value)
    newNote()
    noteField.value = '';
}, false);
