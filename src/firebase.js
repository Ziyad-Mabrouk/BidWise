import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBui-c4eVAxqNWL7CrVrPwqp-IKzJ0fa2w",
  authDomain: "bidwise-7ea4f.firebaseapp.com",
  databaseURL: "https://bidwise-7ea4f-default-rtdb.firebaseio.com",
  projectId: "bidwise-7ea4f",
  storageBucket: "bidwise-7ea4f.appspot.com",
  messagingSenderId: "966906161521",
  appId: "1:966906161521:web:f9a561f2d16de1cfef6ed0",
  measurementId: "G-WX8QH26TSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);