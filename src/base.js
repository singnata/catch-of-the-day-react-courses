import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAo0pSCIShYMFIRFYrHFZaH5mCpqIwBs9M",
    authDomain: "catch-of-the-day-9d45c.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-9d45c.firebaseio.com",
    projectId: "catch-of-the-day-9d45c",
    storageBucket: "",
    messagingSenderId: "272425177935"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
