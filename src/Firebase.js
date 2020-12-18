import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "", //You can use your own API key here
    authDomain: "todo-app-66af4.firebaseapp.com",
    databaseURL: "https://todo-app-66af4.firebaseio.com",
    projectId: "todo-app-66af4",
    storageBucket: "todo-app-66af4.appspot.com",
    messagingSenderId: "164136172795",
    appId: "1:164136172795:web:71696b7ba314d22d22845e",
    measurementId: "G-V95VE9TVK2"
});

const db = firebaseApp.firestore();

export default db;
