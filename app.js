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

  const notesArray = Object.entries(notes);

  notesArray.sort(function (a, b) {
    return b[1].createdAt - a[1].createdAt;
  });

  //console.log(notesArray);

  for (const [noteId, note] of notesArray) {
    createNoteCard(
      note.title,
      note.content,
      noteId,
      note.createdAt,
      note.updatedAt,
    );
  }
});

function createNoteCard(title, content, noteId, createdAt, updatedAt) {
  //console.log(noteId);
  const noteCard = document.createElement("div");
  const formattedDate = new Date(createdAt).toLocaleString("tr-TR");
  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleString("tr-TR")
    : null;

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
            Oluşturuldu: ${formattedDate}
        </small>

        ${
          formattedUpdatedDate
            ? `<small class="note-date">
            Düzenlendi: ${formattedUpdatedDate}
            </small>`
            : ""
        }
    `;

  const editButton = noteCard.querySelector(".edit-button");
  editButton.addEventListener("click", function () {
    editingNoteId = noteId;

    //console.log(editingNoteId);

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
      updatedAt: Date.now(),
    });

    editingNoteId = null;
  } else {
    const notesRef = ref(db, "notes");

    const newNoteRef = push(notesRef);

    set(newNoteRef, {
      title: noteTitle.value,
      content: noteContent.value,
      createdAt: Date.now(),
    });
  }

  //createNoteCard(noteTitle.value, noteContent.value);

  noteTitle.value = "";
  noteContent.value = "";
});
