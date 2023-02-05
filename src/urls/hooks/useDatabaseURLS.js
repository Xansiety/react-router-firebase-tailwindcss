import {  collection,  deleteDoc,  doc,  getDoc,  getDocs,  query,  setDoc,  updateDoc,  where } from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FirebaseAuth, FirebaseDB } from "../../config/firebase";

export const useDatabaseURLS = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});

  const loadUrls = async () => {
    // console.log("loadUrls fn called");
    setLoading((prev) => ({ ...prev, loadingUrls: true }));
    try {
      const collectionRef = collection(FirebaseDB, "urls");
      const queryDocs = query(
        collectionRef,
        where("uid", "==", FirebaseAuth.currentUser.uid)
      );
      const collectionSnap = await getDocs(queryDocs);
      const dataDb = collectionSnap.docs.map((doc) => ({ ...doc.data() }));
      setData(dataDb);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, loadingUrls: false }));
    }
  };

  const createUrl = async (url) => {
    // console.log("createUrl fn called"); 
    setLoading((prev) => ({ ...prev, creatingUrls: true }));
    try {
      // Create a new document with setDocs in collection "urls", with id from nanoid
      const newDoc = {
        origin: url,
        nanoid: nanoid(6),
        uid: FirebaseAuth.currentUser.uid,
        enabled: true,
      };
      // No return value, but the document is created
      // setDoc returns a promise, so we can await it and can create a manual id , addDocs does not allow to create a manual id
      await setDoc(doc(FirebaseDB, "urls", newDoc.nanoid), newDoc);
      // Update the state with the new data
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, creatingUrls: false }));
    }
  };

  const deleteUrl = async (nanoid) => {
    // console.log("deleteUrl fn called");
    setLoading((prev) => ({ ...prev, [nanoid]: true }));
    try {
      const docRef = doc(FirebaseDB, "urls", nanoid);
      await deleteDoc(docRef);
      // Update the state with the new data
      const newCollection = data.filter((item) => item.nanoid !== nanoid);
      setData(newCollection);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const updateUrl = async (nanoid, newOrigin) => {
    // console.log("updateUrl fn called");
    setLoading((prev) => ({ ...prev, [nanoid]: true }));
    try {
      const docRef = doc(FirebaseDB, "urls", nanoid);
      await updateDoc(docRef, { origin: newOrigin });
      // Update the state with the new data
      const newCollection = data.map((item) => item.nanoid === nanoid ? { ...item, origin: newOrigin } : item); 
      setData(newCollection);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };


  const searchUrl = async (nanoid) => { 
    try {
      const docRef = doc(FirebaseDB, "urls", nanoid);
      return await getDoc(docRef); 
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };

  return {
    data,
    error,
    loading,
    createUrl,
    loadUrls,
    updateUrl,
    deleteUrl,
    searchUrl,
  };
};
