
# Firebase Note Notebook

A simple browser-based note-taking app. Users can add note titles and content, then save, edit, and delete notes. This project is mainly for learning and includes a basic Firebase setup.

## Overview

- Note creation, editing, and deletion are handled in `app.js`.
- The user interface is defined in `index.html` and `style.css`.
- Firebase configuration is included in `firebase.js` for Realtime Database setup.

## File Structure

- `index.html` - Application UI and note input form.
- `style.css` - Styling for the app.
- `app.js` - Logic for creating, editing, deleting notes, and handling form behavior.
- `firebase.js` - Firebase configuration and database connection.
- `package.json` - Project dependencies (`firebase` is listed).

## Installation

1. Clone the repository or navigate to the project folder:

```bash
cd firebase-not-defteri
npm install
```

2. Open `index.html` in a browser to run the app. For a better experience, use a local HTTP server.

Example:

```bash
npx http-server .
# or
python -m http.server 8080
```

## Usage

1. Enter a note title and content in the form on `index.html`.
2. Click the save button to add the note as a card.
3. Use Edit to load the note back into the form for updating.
4. Use Delete to remove the note from the list.

> Notes are currently stored only in the browser DOM, so they will be lost when the page is refreshed.

## Firebase Integration Status

- `firebase.js` contains the Firebase SDK setup and `getDatabase` initialization.
- `app.js` does not yet include read/write operations to the database. To enable persistence, add Firebase Database calls such as `set`, `push`, `onValue`, or `get`.

## Development Notes

- Add Firebase Realtime Database or Firestore integration to save notes permanently.
- Add Firebase Authentication to support user-specific notes.
- Implement note update logic with database IDs so edits persist.
- Add autosave or character counters for longer notes.
- Improve responsive styling in `style.css` for mobile support.

## Dependencies

- `firebase` is listed in `package.json`. The current app may use a browser SDK pattern, so review dependency usage for production.

## License

This project is for educational purposes and does not specify a license.
