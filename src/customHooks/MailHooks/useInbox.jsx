import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateUnreadEmails } from "../../store/auth-slice";

export const useInbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToInboxChanges();

    return () => {
      unsubscribe();
    };
  }, [userEmail]);

  const listenToInboxChanges = () => {
    const q = query(
      collection(db, userEmail + "_receivedEmails"),
      where("to", "==", userEmail)
    );

    return onSnapshot(q, (snapshot) => {
      const newEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmails(newEmails);

      const unreadCount = newEmails.filter((email) => !email.read).length;
      dispatch(updateUnreadEmails(unreadCount));
    });
  };

  const markAsRead = async (id) => {
    const emailRef = doc(db, userEmail + "_receivedEmails", id);
    await updateDoc(emailRef, { read: true });
  };

  const deleteEmail = async (id) => {
    const emailRef = doc(db, userEmail + "_receivedEmails", id);
    await deleteDoc(emailRef);
  };

  return { emails, markAsRead, deleteEmail };
};
