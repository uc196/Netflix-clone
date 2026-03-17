// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCVog_IJoEHbDcz2vOfpUvstAnkmw7OFCE",
  authDomain: "netflix-57512.firebaseapp.com",
  projectId: "netflix-57512",
  storageBucket: "netflix-57512.appspot.com",
  messagingSenderId: "564641381874",
  appId: "1:564641381874:web:aa9c49eb9bebcc333d3f6b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    console.log("Logged in user:", res.user);
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Error logging out.");
  }
};

export { auth, db, signup, login, logout };
