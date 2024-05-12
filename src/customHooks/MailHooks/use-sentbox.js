import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setSentEmails } from "../../store/auth-slice";

export const useSentBox = () => {
  const emails = useSelector((state) => state.auth.sentEmails);
  const senderEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToSentEmails();

    return () => {
      unsubscribe();
    };
  }, [senderEmail]);

  const listenToSentEmails = () => {
    const q = query(collection(db, senderEmail + "_sentEmails"));

    return onSnapshot(q, (snapshot) => {
      const updatedEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setSentEmails(updatedEmails));
    });
  };

  const deleteEmail = async (id) => {
    const emailRef = doc(db, senderEmail + "_sentEmails", id);
    await deleteDoc(emailRef);
  };

  return { emails, deleteEmail };
};
