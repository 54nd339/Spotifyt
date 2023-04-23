// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHX3fWEs0YWpX_wlX-X2N_AOtjIM1zj7Q",
  authDomain: "flipr-spotify.firebaseapp.com",
  projectId: "flipr-spotify",
  storageBucket: "flipr-spotify.appspot.com",
  messagingSenderId: "107164323080",
  appId: "1:107164323080:web:3b8351979413ea268830bd",
  measurementId: "G-2Z0BMEXL5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Utils
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// export utils/refs
export {
  db, auth, storage
}