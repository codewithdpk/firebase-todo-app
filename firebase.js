import firebase from "firebase";

const firebaseConfig = {
  apiKey: "--YOURS--",
  authDomain: "--YOURS--",
  databaseURL: "--YOURS--",
  projectId: "--YOURS--",
  storageBucket: "--YOURS--",
  messagingSenderId: "--YOURS--",
  appId: "--YOURS--",
  measurementId: "--YOURS--",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
