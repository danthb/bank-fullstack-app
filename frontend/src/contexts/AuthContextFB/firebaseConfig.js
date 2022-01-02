import {initializeApp} from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"


// Initialize Firebase
initializeApp({
    apiKey: "AIzaSyDBTb7qL7tYVfsrmVVzcTM3TsEc_NljkXg",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
});


const auth = getAuth();
const firebase = {
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
}
export default firebase;