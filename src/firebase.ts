import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // even though apiKey is public and exposed to client, it's still a good practice to hide it in .env file in the codebase
  authDomain: "playing-field-575c0.firebaseapp.com",
  projectId: "playing-field-575c0",
  storageBucket: "playing-field-575c0.appspot.com",
  messagingSenderId: "810566293782",
  appId: "1:810566293782:web:411c733ddc4e077d575837",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
