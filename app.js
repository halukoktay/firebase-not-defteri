import { db } from "./firebase.js";

import {
  ref,
  push,
  set,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const saveButton = document.getElementById("save-button");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const notesRef = ref(db, "notes");

let editingNoteId = null;

onValue(notesRef, function (snapshot) {
  const notes = snapshot.val();

  notesList.innerHTML = "";

  if (notes === null) {
    return;
  }

  for (const noteId in notes) {
    const note = notes[noteId];

    createNoteCard(note.title, note.content, noteId);
  }
});

function createNoteCard(title, content, noteId) {
  //console.log(noteId);
  const noteCard = document.createElement("div");
  const createdAt = new Date().toLocaleString("tr-TR");

  noteCard.classList.add("note-card");

  noteCard.innerHTML = `
        <div class="note-header">
            <h3>${title}</h3>

                <div class="note-actions">
                    <button class="edit-button">Düzenle</button>
                    <button class="delete-button">Sil</button>
                </div>
        </div>

        <p>${content}</p>

        <small class="note-date">
            Tarih: ${createdAt}
        </small>
    `;

  const editButton = noteCard.querySelector(".edit-button");
  editButton.addEventListener("click", function () {
    editingNoteId = noteId;

    console.log(editingNoteId);

    const editedTitle = noteCard.querySelector("h3");
    const editedContent = noteCard.querySelector("p");

    noteTitle.value = editedTitle.textContent;
    noteContent.value = editedContent.textContent;

    noteCard.remove();
  });

  const deleteButton = noteCard.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    //notesList.removeChild(noteCard); bu şekilde de silebiliriz ama remove() daha kısa ve temiz bir yöntem.
    //noteCard.remove();
    const noteDeleteRef = ref(db, `notes/${noteId}`);

    remove(noteDeleteRef);
  });

  notesList.appendChild(noteCard);
}

saveButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (noteTitle.value.trim() === "" || noteContent.value.trim() === "") {
    return;
  }

  if (editingNoteId) {
    const noteUpdateRef = ref(db, `notes/${editingNoteId}`);

    update(noteUpdateRef, {
      title: noteTitle.value,
      content: noteContent.value,
    });

    editingNoteId = null;
  } else {
    const notesRef = ref(db, "notes");

    const newNoteRef = push(notesRef);

    set(newNoteRef, {
      title: noteTitle.value,
      content: noteContent.value,
    });
  }

  //createNoteCard(noteTitle.value, noteContent.value);

  noteTitle.value = "";
  noteContent.value = "";
});
