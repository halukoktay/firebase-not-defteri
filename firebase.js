import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAA7P0Oo7LLd_7ArTSlAfkbBoVGuTASq5k",
  authDomain: "fir-not-defteri.firebaseapp.com",
  databaseURL: "https://fir-not-defteri-default-rtdb.firebaseio.com",
  projectId: "fir-not-defteri",
  storageBucket: "fir-not-defteri.firebasestorage.app",
  messagingSenderId: "596842626868",
  appId: "1:596842626868:web:fbf8500f47b2d85f8f6f61"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
