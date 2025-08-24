// // config/firebase.js
import { initializeApp , getApps} from 'firebase/app';
import { initializeAuth, getReactNativePersistence ,getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKSNEv107SSMt2BemiVTN2fvqdJoAKy5Y",
  authDomain: "rti-express.firebaseapp.com",
  projectId: "rti-express",
  storageBucket: "rti-express.appspot.com", // ✅ corrected
  messagingSenderId: "932745465598",
  appId: "1:932745465598:web:15b5a67a55f35a70ed5faf",
  measurementId: "G-PPFRPF9C5M"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (err) {

  auth = getAuth(app);
}


export { auth, app }; // ✅ export both
