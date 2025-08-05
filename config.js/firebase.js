// // config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBKSNEv107SSMt2BemiVTN2fvqdJoAKy5Y",
  authDomain: "rti-express.firebaseapp.com",
  projectId: "rti-express",
  storageBucket: "rti-express.appspot.com", // ✅ corrected
  messagingSenderId: "932745465598",
  appId: "1:932745465598:web:15b5a67a55f35a70ed5faf",
  measurementId: "G-PPFRPF9C5M"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { auth, app }; // ✅ export both
