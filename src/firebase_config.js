import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD7HVU2v22fdFo7CRRigIxXn6uCdQIcM_o",
  authDomain: "todo-33867.firebaseapp.com",
  projectId: "todo-33867",
  storageBucket: "todo-33867.appspot.com",
  messagingSenderId: "451682281859",
  appId: "1:451682281859:web:5ae3c0b8724f60ff11aeb6",
  measurementId: "G-Z7T4ETW1XQ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 