import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCaKcqT51epuuYkfRc_0l0weQMr4GIRaOI",
  authDomain: "ts-chatapp-748dc.firebaseapp.com",
  projectId: "ts-chatapp-748dc",
  storageBucket: "ts-chatapp-748dc.appspot.com",
  messagingSenderId: "764791331785",
  appId: "1:764791331785:web:bfd9ed13fa680b949ee618",
  measurementId: "G-MNBCJ3MG4V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
export const auth = firebase.auth()
export const db = firebase.firestore()