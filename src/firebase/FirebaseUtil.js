import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./FirebaseConfig";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const signOutWithGoogle = () => {
  return signOut(auth);
};

export const getItem = (collectionPath, id) => {
  return getDoc(doc(db, collectionPath, id));
};

export const getQueryItem = (collectionPath, property, operand, value) => {
  return getDocs(
    query(collection(db, collectionPath), where(property, operand, value))
  );
};

export const addItem = (collectionPath, payload) => {
  return addDoc(collection(db, collectionPath), payload);
};

export const setItem = (collectionPath, id, payload) => {
  return setDoc(doc(db, collectionPath, id), payload);
};

export const updateItem = (collectionPath, id, payload) => {
  return updateDoc(doc(db, collectionPath, id), payload);
};

export const deleteItem = (collectionPath, id) => {
  return deleteDoc(doc(db, collectionPath, id));
};
