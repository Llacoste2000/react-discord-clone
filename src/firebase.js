import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB3y20bVvbA3ewv6SXKILmP3R-iH-3vH6k",
  authDomain: "discord-react-c.firebaseapp.com",
  databaseURL: "https://discord-react-c.firebaseio.com",
  projectId: "discord-react-c",
  storageBucket: "discord-react-c.appspot.com",
  messagingSenderId: "253942725794",
  appId: "1:253942725794:web:f796a60dd409be86a42bfb",
  measurementId: "G-9PMEDQBJZ1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
