import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // grab this below things from config 
    apiKey: "AIzaSyAGiBzp7yflmtbT38fwU_-uDsowD0RJboo",
    authDomain: "fb-messenger-14dc0.firebaseapp.com",
    databaseURL: "https://fb-messenger-14dc0.firebaseio.com",
    projectId: "fb-messenger-14dc0",
    storageBucket: "fb-messenger-14dc0.appspot.com",
    messagingSenderId: "732582467948",
    appId: "1:732582467948:web:15f59fa1a24b01075d3b49",
    measurementId: "G-M1G6BDX0M3"
});

const db = firebaseApp.firestore();
export default db; // now we can use db in any of the files.