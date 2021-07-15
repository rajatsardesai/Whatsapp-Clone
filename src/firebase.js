// This import loads the firebase namespace.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-C46FSQftMiwsnj9d7Y7x9GFDYbwdZYg",
    authDomain: "whatsapp-clone-8b090.firebaseapp.com",
    projectId: "whatsapp-clone-8b090",
    storageBucket: "whatsapp-clone-8b090.appspot.com",
    messagingSenderId: "765691690927",
    appId: "1:765691690927:web:5d92ded0fc75571aea795a",
    measurementId: "G-YLC3W4CVGB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;